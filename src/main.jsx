import { createRoot } from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './components/Layout.jsx';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import CommandList from './pages/CommandList.jsx';
import Command from './pages/CommandCreate.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import CommandView from './pages/CommandView.jsx';

const root = document.getElementById("root");

createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Layout><Login /></Layout></PublicRoute>} />
        <Route path="/commands" element={<PrivateRoute><Layout><CommandList /></Layout></PrivateRoute>} />
        <Route path="/commands/create" element={<PrivateRoute><Layout><Command /></Layout></PrivateRoute>} />
        <Route path="/commands/view/:historyId" element={<PrivateRoute><Layout><CommandView /></Layout></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);