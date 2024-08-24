// pages/index.js

import {
  Dashboard,
  Header,
  SummaryCard,
  TransactionForm,
  BudgetGoalForm,
  TransactionList,
  Chart
} from '../components';

export default function Home() {
  return (
    <div>
      <Header />
      <Dashboard>
        <SummaryCard />
        <TransactionForm />
        <BudgetGoalForm />
        <TransactionList />
        <Chart />
      </Dashboard>
    </div>
  );
}
