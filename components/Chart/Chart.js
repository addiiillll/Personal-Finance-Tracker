import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ transactions, title, type }) {
  // Process data
  const data = transactions
    .filter((t) => t.type === type)
    .reduce((acc, transaction) => {
      const existingCategory = acc.find(
        (item) => item.name === transaction.category
      );
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        acc.push({ name: transaction.category, value: transaction.amount });
      }
      return acc;
    }, []);

  // Chart color
  const color = type === "income" ? "#34d399" : "#818cf8";

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl border border-gray-300">
      {/* Chart Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h2>
      
      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            stroke="#374151"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#374151"
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "8px",
            }}
            itemStyle={{ color: "#374151" }}
            cursor={{ fill: "rgba(156, 163, 175, 0.2)" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingTop: "10px" }}
          />
          <Bar
            dataKey="value"
            fill={color}
            radius={[5, 5, 0, 0]}
            label={{ position: "top", fill: "#374151", fontSize: 12 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
