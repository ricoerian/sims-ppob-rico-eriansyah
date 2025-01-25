import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { store } from './redux/store';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { PrivateRoute, TokenCheck } from './Middleware/PrivateRoute';
import PaymentPage from './pages/PaymentPage';
import Transactions from './pages/Transactions';
import TopUp from './pages/TopUp';
import Account from './pages/Account';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <TokenCheck>
                <Login />
              </TokenCheck>
            }
          />
          <Route path="/register" element={
              <TokenCheck>
                <Register />
              </TokenCheck>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/service/:serviceCode" element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />
          <Route path="/transaksi" element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route path="/topup" element={
              <PrivateRoute>
                <TopUp />
              </PrivateRoute>
            }
          />
          <Route path="/akun" element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);