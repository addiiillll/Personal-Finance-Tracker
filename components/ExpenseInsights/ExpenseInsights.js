import React, { useEffect, useState } from 'react';

export default function ExpenseInsights({ transactions }) {
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        generateInsights();
    }, [transactions]);

    const generateInsights = () => {
        const categoryTotals = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'expense') {
                if (!acc[transaction.category]) {
                    acc[transaction.category] = 0;
                }
                acc[transaction.category] += transaction.amount;
            }
            return acc;
        }, {});

        const totalExpenses = Object.values(categoryTotals).reduce((acc, amount) => acc + amount, 0);

        const suggestions = Object.keys(categoryTotals).map((category) => {
            const percentage = ((categoryTotals[category] / totalExpenses) * 100).toFixed(2);
            return {
                category,
                percentage,
                suggestion: percentage > 20
                    ? `Consider reducing your spending on ${category}. It accounts for ${percentage}% of your total expenses.`
                    : `Your spending on ${category} is within a reasonable range.`,
            };
        });

        setInsights(suggestions);
    };

    return (
        <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Insights</h2>
            <ul className="space-y-4">
                {insights.map((insight, index) => (
                    <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <strong>{insight.category}:</strong> {insight.suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
