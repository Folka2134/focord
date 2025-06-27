import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import { Loader } from "lucide-react";

import "./App.css";

import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { Authenticate } from "./components/Authentication/Authenticate";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  console.log(isCheckingAuth);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/authenticate"} />}
        />
        <Route
          path="/authenticate"
          element={!authUser ? <Authenticate /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
