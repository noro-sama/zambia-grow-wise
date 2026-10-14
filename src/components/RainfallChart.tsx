import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { RAINFALL } from "@/lib/agri";
import { Card } from "./AppShell";

export function RainfallChart() {
  return (
    <Card>
      <h2 className="font-display text-2xl font-bold">Rainfall (mm)</h2>
      <p className="text-lg text-muted-foreground">Historical average vs. this season's prediction</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={RAINFALL} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 14 }} />
            <YAxis tick={{ fontSize: 13 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 15 }} />
            <Bar dataKey="historical" name="Historical" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="predicted" name="Predicted" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-lg">Lower rains are expected. Prepare for dry spells by choosing drought-resistant crops.</p>
    </Card>
  );
}
