import { Navigate } from "react-router";

// Dummy authentication function. Replace with real logic.
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
