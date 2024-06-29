import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import PublicNavbar from "./Components/Navbar/PublicNavbar";
import Privatenavbar from "./Components/Navbar/Privatenavbar";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import { useSelector } from "react-redux";
import AddCategory from "./Components/Category/AddCategory";
import CategoriesList from "./Components/Category/CategoriesList";
import UpdateCategory from "./Components/Category/UpdateCategory";
import TransactionForm from "./Components/Transactions/TransactionForm";
import Dashboard from "./Components/Users/Dashboard";
import UserProfile from "./Components/Users/UserProfile";
import AuthRoute from "./Components/Auth/AuthRoute";

function App() {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
      {user ? <Privatenavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthRoute>
              <TransactionForm />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
