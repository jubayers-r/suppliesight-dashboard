import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { products, warehouses } from "./mockData.js";

async function startServer() {
  const app = express();

 const generateKPIs = (days) => {
  const kpis = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Stable variation based on date (so it won’t change on refresh)
    const seed = date.getDate() + date.getMonth();
    const variation = 0.95 + ((seed % 10) / 100); // 0.95 → 1.05 range

    const totalStock = Math.round(
      products.reduce((sum, p) => sum + p.stock, 0) * variation
    );
    const totalDemand = Math.round(
      products.reduce((sum, p) => sum + p.demand, 0) * variation
    );

    kpis.push({
      date: date.toISOString().split("T")[0],
      stock: totalStock,
      demand: totalDemand,
    });
  }

  return kpis;
};

  const typeDefs = `#graphql
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

  const getProductStatus = (product) => {
    if (product.stock > product.demand) return "Healthy";
    if (product.stock === product.demand) return "Low";
    return "Critical";
  };

  const resolvers = {
    Query: {
      products: (_, { search, status, warehouse }) => {
        let result = [...products];

        // Filter by search (name, SKU, or ID)
        if (search) {
          const searchLower = search.toLowerCase();
          result = result.filter(
            (p) =>
              p.name.toLowerCase().includes(searchLower) ||
              p.sku.toLowerCase().includes(searchLower) ||
              p.id.toLowerCase().includes(searchLower)
          );
        }

        // Filter by warehouse
        if (warehouse) {
          result = result.filter((p) => p.warehouse === warehouse);
        }

        // Filter by status
        if (status && status !== "All") {
          result = result.filter((p) => getProductStatus(p) === status);
        }

        return result;
      },

      warehouses: () => warehouses,

      kpis: (_, { range }) => {
        const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
        return generateKPIs(days);
      },
    },

    Mutation: {
      updateDemand: (_, { id, demand }) => {
        const product = products.find((p) => p.id === id);
        if (!product) throw new Error("Product not found");
        product.demand = demand;
        return product;
      },

      transferStock: (_, { id, from, to, qty }) => {
        const sourceProduct = products.find(
          (p) => p.id === id && p.warehouse === from
        );
        if (!sourceProduct || sourceProduct.stock < qty) {
          throw new Error(
            "Invalid transfer: insufficient stock or product not found"
          );
        }

        sourceProduct.stock -= qty;

        // Find or create target product
        let targetProduct = products.find(
          (p) => p.id === id && p.warehouse === to
        );
        if (!targetProduct) {
          targetProduct = {
            ...sourceProduct,
            warehouse: to,
            stock: 0,
            id: `${id}-${to}`, // Create unique ID for new warehouse location
          };
          products.push(targetProduct);
        }
        targetProduct.stock += qty;

        return targetProduct;
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
  app.get("/", (req, res) => {
    res.send("✅ Suppliesight GraphQL server is running at /graphql");
  });

  app.listen(8000, () => console.log("server started at port 8000"));
}

startServer();
