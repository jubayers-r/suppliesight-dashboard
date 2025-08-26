import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockDemandChart({ data }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Stock vs Demand Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            {/* Grid lines with slightly darker color */}
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={70}
              stroke="#555"
              interval={0} // ensures labels show properly
            />

            {/* Y Axis */}
            <YAxis domain={["dataMin", "dataMax"]} stroke="#555" />

            {/* Tooltip with white-ish background */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />

            {/* Stock line */}
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#38b48b"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />

            {/* Demand line */}
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#00bcff"
              strokeWidth={2}
              strokeDasharray="5 5"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
