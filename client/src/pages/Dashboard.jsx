import React, { useState, useEffect } from "react";

import Header from "@/components/Header";
import { Package } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { BarChart3 } from "lucide-react";
import axios from "axios";
import KpiCard from "@/components/KpiCard";
import StockDemandChart from "@/components/StockDemandChart";
import Filters from "@/components/Filters";
import { Card, CardContent } from "@/components/ui/card";
import ProductTable from "@/components/ProductTable";
import { getProductStatus, getStatusVariant } from "@/lib/utils";

// GraphQL client simulation

const graphqlFetch = async (query, variables = {}) => {
  try {
    const response = await axios.post("http://localhost:8000/graphql", {
      query,
      variables,
    });
    return response.data.data;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    throw error;
  }
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

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateDemandValue, setUpdateDemandValue] = useState("");
  const [transferQty, setTransferQty] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Calculate KPIs
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const fillRate =
    totalDemand > 0
      ? Math.round(
          (products.reduce((sum, p) => sum + Math.min(p.stock, p.demand), 0) /
            totalDemand) *
            100
        )
      : 0;

  const calculatedKPIs = { totalStock, totalDemand, fillRate };

  // Handle row click
  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setUpdateDemandValue(product.demand.toString());
    setTransferQty("");
    setTransferTo("");
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        title="SupplySight"
        ranges={["7d", "14d", "30d"]}
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />

      <div className="container mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <KpiCard
            title="Total Stock"
            icon={Package}
            value={calculatedKPIs.totalStock.toLocaleString()}
          />
          <KpiCard
            title="Total Demand"
            icon={TrendingUp}
            value={calculatedKPIs.totalDemand.toLocaleString()}
          />
          <KpiCard
            title="Fill Rate"
            icon={BarChart3}
            value={`${calculatedKPIs.fillRate}%`}
          />
        </div>

        {/* Chart */}
        <StockDemandChart data={kpis} />

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedWarehouse={selectedWarehouse}
              setSelectedWarehouse={setSelectedWarehouse}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              warehouses={warehouses}
            />
          </CardContent>
        </Card>

        {/* Products Table */}
        <ProductTable
          products={products}
          onRowClick={handleRowClick}
          getProductStatus={getProductStatus}
          getStatusVariant={getStatusVariant}
        />
      </div>
    </div>
  );
};

export default Dashboard;
