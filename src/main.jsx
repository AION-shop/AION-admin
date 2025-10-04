import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { persistor, store } from './redux/store.js';
import PrivateRouter from './guard/PrivateRouter.jsx';
import LoginPage from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRouter>
      <App />
    </PrivateRouter>,
  },
  {
    path: '/login',
    element: <LoginPage />
  }

]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
