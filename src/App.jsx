import { BrowserRouter, Routes, Route } from "react-router-dom";

function Login() {
  return <h2>Login Page</h2>;
}

function Register() {
  return <h2>Register Page</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function App() {
  // console.log(import.meta.env.VITE_API_URL);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;