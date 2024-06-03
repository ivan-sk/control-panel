import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "components/Login";
import Home from "components/Home";
import Activation from "components/Activation";
import Account from "components/Account";
import Oauth from "components/Oauth";
import ProtectedRoute from "components/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  

  return (
    <AuthProvider>
      
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/oauth' element={<Oauth />} />

          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/activation'
            element={
              <ProtectedRoute>
                <Activation />
              </ProtectedRoute>
            }
          />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
