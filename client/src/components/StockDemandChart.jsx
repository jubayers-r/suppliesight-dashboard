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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#000000"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
