import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Finance Tracker</title>
        <meta name="description" content="Personal Finance Tracker" />
        <meta name="keywords" content="finance, tracker, money management, budgeting, expenses, savings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
