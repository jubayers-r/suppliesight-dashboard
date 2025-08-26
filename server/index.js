import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { products } from "./mockData.js";

async function startServer() {
  const app = express();

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

  const resolvers = {
    Query: {
      products: (_, { search, status, warehouse }) => {
        let result = products;
        if (search) {
          result = result.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (warehouse) {
          result = result.filter((p) => p.warehouse === warehouse);
        }
        // Optional: filter by status (like overstocked, understocked)
        return result;
      },

      warehouses: () => warehouses,

      kpis: (_, { range }) => {
        // just return mock data for now
        return kpis;
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
        const source = products.find(
          (p) => p.id === id && p.warehouse === from
        );
        if (!source || source.stock < qty) throw new Error("Invalid transfer");
        source.stock -= qty;

        let target = products.find((p) => p.id === id && p.warehouse === to);
        if (!target) {
          target = { ...source, warehouse: to, stock: 0 };
          products.push(target);
        }
        target.stock += qty;

        return target;
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.listen(8000, () => console.log("server started at port 8000"));
}

startServer();
