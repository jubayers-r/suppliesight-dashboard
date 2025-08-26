import React, { useState, useEffect} from "react";

import Header from "@/components/Header";


// GraphQL client simulation
const graphqlFetch = async (query, variables = {}) => {
  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json();
  return result.data;
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState("7d");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("All");


  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, warehousesData, kpisData] = await Promise.all([
          graphqlFetch(
            `
            query GetProducts($search: String, $status: String, $warehouse: String) {
              products(search: $search, status: $status, warehouse: $warehouse) {
                id name sku warehouse stock demand
              }
            }
          `,
            {
              search: searchTerm || null,
              status: selectedStatus === "All" ? null : selectedStatus,
              warehouse: selectedWarehouse === "all" ? null : selectedWarehouse,
            }
          ),
          graphqlFetch("query { warehouses { code name city country } }"),
          graphqlFetch(
            "query GetKPIs($range: String!) { kpis(range: $range) { date stock demand } }",
            { range: selectedRange }
          ),
        ]);

        setProducts(productsData.products || []);
        setWarehouses(warehousesData.warehouses || []);
        setKpis(kpisData.kpis || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, selectedStatus, selectedWarehouse, selectedRange]);






  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        title="SupplySight"
        ranges={["7d", "14d", "30d"]}
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />
    </div>
  );
};

export default Dashboard;
