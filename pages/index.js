import {
  Dashboard,
  Header,
  SummaryCard,
  TransactionForm,
  BudgetGoalForm,
  TransactionList,
  Chart,
} from "../components";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-300 rounded-full opacity-30 animate-pulse top-1/3 left-1/4"></div>
          <div className="absolute w-72 h-72 bg-indigo-400 rounded-full opacity-20 animate-ping top-1/4 right-1/3"></div>
          <div className="absolute w-64 h-64 bg-white rounded-full opacity-10 animate-bounce top-1/2 right-1/4"></div>
        </div>

        {/* Sign In Card */}
        <div className="relative z-10 bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            Welcome to Personal Finance Tracker
          </h1>
          <p className="text-gray-600 mb-6">
            Track your income, expenses, and savings in one place. Please sign
            in to continue.
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 bg-white text-black text-lg font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300"
          >
            <span className="flex items-center justify-center">
              <img
                src="/google-icon.png"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </span>
          </button>
        </div>
      </div>
    );
  }

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
