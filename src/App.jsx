
import "./App.css";
import "./Premium.css";
import { useEffect } from "react";
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

import { Profile } from "./components/Profile";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="screen-glow" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          className: 'premium-toast',
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
      <ScrollToTop />
      <Routes>

        {/* PUBLIC / USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/services" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
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
