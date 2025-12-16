
import "./App.css";
import { Admin } from "./components/Admin";
import { Appointment } from "./components/Appointment";
import { Home } from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { Service } from "./components/Service";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { MyAppointments } from "./components/MyAppointments";
import { AdminLayout } from "./components/AdminLayout";
import { AdminAppointments } from "./components/AdminAppointments";
import { UserLayout } from "./components/UserLayout";

function App() {
  return (
    <>
      <Routes>

        {/* PUBLIC / USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/services" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myappointments" element={<MyAppointments />} />
        </Route>

        {/* ADMIN ROUTES (No User Nav) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="appointments" element={<AdminAppointments />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
