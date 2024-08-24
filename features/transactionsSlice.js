import { createSlice } from '@reduxjs/toolkit';

const calculateTotals = (transactions) => {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === 'income') {
        totals.totalIncome += transaction.amount;
        totals.totalSavings += transaction.amount;
      } else {
        totals.totalExpenses += transaction.amount;
        totals.totalSavings -= transaction.amount;
      }
      return totals;
    },
    { totalIncome: 0, totalExpenses: 0, totalSavings: 0 }
  );
};

const loadState = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  try {
    const serializedState = localStorage.getItem('financeTrackerState');
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    const transactions = Array.isArray(parsedState.transactions?.transactions)
      ? parsedState.transactions.transactions
      : [];
    const totals = calculateTotals(transactions);
    return {
      transactions,
      budgetGoal: parsedState.transactions?.budgetGoal || 0,
      ...totals,
    };
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

const initialState = {
  transactions: [],
  totalIncome: 0,
  totalExpenses: 0,
  totalSavings: 0,
  budgetGoal: 0,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: loadState() || initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.totalIncome += action.payload.amount;
        state.totalSavings += action.payload.amount;
      } else {
        state.totalExpenses += action.payload.amount;
        state.totalSavings -= action.payload.amount;
      }
    },
    deleteTransaction: (state, action) => {
      const transaction = state.transactions.find(
        (transaction) => transaction.id === action.payload
      );
      if (transaction) {
        if (transaction.type === 'income') {
          state.totalIncome -= transaction.amount;
          state.totalSavings -= transaction.amount;
        } else {
          state.totalExpenses -= transaction.amount;
          state.totalSavings += transaction.amount;
        }
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
      }
    },
    setBudgetGoal: (state, action) => {
      state.budgetGoal = action.payload;
    },
  },
});

export const { addTransaction, deleteTransaction, setBudgetGoal } = transactionsSlice.actions;
export default transactionsSlice.reducer;
