import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '@/features/transactionsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const serializedState = JSON.stringify(store.getState());
      localStorage.setItem('financeTrackerState', serializedState);
    } catch (err) {
      console.error('Could not save state to localStorage', err);
    }
  });
}