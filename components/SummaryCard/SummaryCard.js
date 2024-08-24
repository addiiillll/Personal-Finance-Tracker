export default function SummaryCard({ title, amount, color, isClient }) {
    const colorClass = `text-${color}-600`;
  
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className={`text-3xl font-bold ${colorClass}`}>
          ₹{isClient ? amount.toFixed(2) : '...'}
        </p>
      </div>
    );
  }
  