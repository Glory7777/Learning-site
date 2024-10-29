import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AllPages } from "./routes";
import menuConfig from "./config/menu";

const App = () => {
  const renderRoutes = (menuItems) => {
    return menuItems
      .map((item) => {
        if (item.children) {
          return renderRoutes(item.children);
        }
        const PageComponent = AllPages[item.component];
        if (!PageComponent) {
          console.warn(`Component ${item.component} not found`);
          return null;
        }
        return (
          <Route key={item.url} path={item.url} element={<PageComponent />} />
        );
      })
      .flat()
      .filter(Boolean); // null 값 제거
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <Routes>
                {renderRoutes(menuConfig)}
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
