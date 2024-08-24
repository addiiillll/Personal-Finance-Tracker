import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../features/transactionsSlice';

export default function TransactionList({ transactions, showTransactions, toggleTransactions }) {
  const dispatch = useDispatch();

  return (
    <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <button onClick={toggleTransactions} className="text-2xl font-semibold text-gray-800 flex items-center">
        Transactions
        <svg className={`ml-2 h-6 w-6 ${showTransactions ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {showTransactions && (
        <ul className="mt-4 space-y-2">
          {Array.isArray(transactions) && transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="font-semibold text-gray-700">{transaction.category}</span>: ₹
                {transaction.amount.toFixed(2)} ({transaction.type})
              </div>
              <button
                onClick={() => dispatch(deleteTransaction(transaction.id))}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
