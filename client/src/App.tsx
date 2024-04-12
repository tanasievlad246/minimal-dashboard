import { Route, Routes } from "react-router-dom"
import { Login } from "./views/login"
import { Invoices } from "./views/invoices";
import { ProtectedRoute } from "./components/privateRoute";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkUserIsAuthenticated } from "./features/user-authentication";
import useAuthCheck from "./hooks/checkAuth";
import { Navigation } from "./components/Navigation";

function App() {
  useAuthCheck();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(checkUserIsAuthenticated());
    return () => {
      promise.abort();
    }
  }, []);

  const value = useAppSelector(state => state.userAuthentication.isAuthenticated);

  useEffect(() => {
    console.log('isAuth', value);
  }, [value]);

  return (
    <div className="grid grid-flow-col align-middle grid-cols-12 bg-gradient-to-b from-primary-100 to-primary-600 h-screen p-4">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/invoices" element={
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        } />
        {/* Catch all routes */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
