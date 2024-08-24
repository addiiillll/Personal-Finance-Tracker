import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../features/transactionsSlice';

export default function TransactionForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income');
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    const API_KEY = 'acbb82c6cb102bce5560b6ca';
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`);
      const data = await response.json();
      setExchangeRates(data.conversion_rates);
      setCurrencies(Object.keys(data.conversion_rates));
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const convertCurrency = (amount, from, to) => {
    if (from === to) return amount;
    const rateFrom = exchangeRates[from];
    const rateTo = exchangeRates[to];
    return (amount / rateFrom) * rateTo;
  };

  const handleAddTransaction = () => {
    const amountInINR = convertCurrency(parseFloat(amount), fromCurrency, 'INR');
    dispatch(
      addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        amount: amountInINR,
        category,
        type,
        originalAmount: parseFloat(amount),
        originalCurrency: fromCurrency,
      })
    );
    setAmount('');
    setCategory('');
  };

  return (
    <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Transaction</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTransaction}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      {fromCurrency !== 'INR' && (
        <p className="mt-2 text-sm text-gray-600">
          Converted amount: {convertCurrency(amount || 0, fromCurrency, 'INR').toFixed(2)} INR
        </p>
      )}
    </div>
  );
}