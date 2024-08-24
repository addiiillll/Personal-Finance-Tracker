import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBudgetGoal } from '../../features/transactionsSlice';
import Header from '../Header/Header';
import SummaryCard from '../SummaryCard/SummaryCard';
import TransactionForm from '../TransactionForm/TransactionForm';
import BudgetGoalForm from '../BudgetGoalForm/BudgetGoalForm';
import TransactionList from '../TransactionList/TransactionList';
import Chart from '../Chart/Chart';
import ExpenseInsights from '../ExpenseInsights/ExpenseInsights';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { transactions = [], totalIncome = 0, totalExpenses = 0, totalSavings = 0, budgetGoal = 0 } = useSelector(
    (state) => state.transactions || {}
  );

  const [inputBudgetGoal, setInputBudgetGoal] = useState(budgetGoal || 0);
  const [showTransactions, setShowTransactions] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalExpensesForMonth = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const budgetProgress = budgetGoal > 0 ? (totalExpensesForMonth / budgetGoal) * 100 : 0;

  const handleBudgetGoalChange = (e) => {
    setInputBudgetGoal(e.target.value);
  };

  const updateBudgetGoal = () => {
    dispatch(setBudgetGoal(parseFloat(inputBudgetGoal)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header title="Personal Finance Tracker" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard title="Total Income" amount={totalIncome} color="green" isClient={isClient} />
        <SummaryCard title="Total Expenses" amount={totalExpenses} color="red" isClient={isClient} />
        <SummaryCard title="Total Savings" amount={totalSavings} color="blue" isClient={isClient} />
      </div>

      <TransactionForm />

      <BudgetGoalForm
        inputBudgetGoal={inputBudgetGoal}
        handleBudgetGoalChange={handleBudgetGoalChange}
        updateBudgetGoal={updateBudgetGoal}
        budgetProgress={budgetProgress}
        budgetGoal={budgetGoal}
      />

      <TransactionList
        transactions={transactions}
        showTransactions={showTransactions}
        toggleTransactions={() => setShowTransactions((prevState) => !prevState)}
      />

      {isClient && (
        <>
          <Chart transactions={transactions} title="Spending Habits" type="expense" />
          <Chart transactions={transactions} title="Income Sources" type="income" />
        </>
      )}

      <ExpenseInsights transactions={transactions} />
    </div>
  );
}
