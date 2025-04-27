import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import TasksPage from "./pages/Tasks/TasksPage";
import SignUpPage from "./pages/SignUp/SignUpPage";  // Importar a página de cadastro
import { AuthProvider, useAuth } from "./services/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> {/* Rota de cadastro */}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
