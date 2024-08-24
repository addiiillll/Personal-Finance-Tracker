import { useState, useEffect } from 'react';

export default function BudgetGoalForm({ inputBudgetGoal, handleBudgetGoalChange, updateBudgetGoal, budgetProgress, budgetGoal }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Set Budget Goal</h2>
      <input
        type="number"
        placeholder="Monthly Budget Goal"
        value={inputBudgetGoal}
        onChange={handleBudgetGoalChange}
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={updateBudgetGoal}
        className="mt-4 p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
      >
        Update Budget Goal
      </button>
      {budgetGoal > 0 && (
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800">Budget Progress:</p>
          <div className="relative pt-1">
            <div className="flex items-center justify-center mb-1">
              <span className="text-sm font-medium mt-3 text-green-800">
                {budgetProgress.toFixed(2)}%
              </span>
            </div>
            <div
              className="flex flex-col h-2 bg-green-300 rounded-lg"
              style={{ width: `${Math.min(budgetProgress, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
