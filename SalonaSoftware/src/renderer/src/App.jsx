import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import SidebarLayout from './layout/SidebarLayout'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import Music from './pages/Music'
import Appointment from './pages/Appointment'
import Settings from './pages/Settings'
import SplashScreen from './pages/Auth/SplashScreen'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Otp from './pages/Auth/Otp'
import { ToastContainer } from 'react-toastify'
import Combos from './pages/Combos'
import Customer from './pages/Users'
import SalonCreation from './pages/Auth/SalonCreation'
import { useEffect } from 'react'
import Coupons from './pages/Coupons'
import Invoice from './components/Invoice'
import ModernInvoice from './components/ModernInvoice'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <Router>
      <ToastContainer position="top-left" autoClose={1500} />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/salonCreate" element={<SalonCreation />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/auth" element={<SidebarLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="service" element={<Services />} />
          <Route path="service/:id" element={<Services />} />
          <Route path="combos" element={<Combos />} />
          <Route path="combos/:id" element={<Combos />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="coupons/:id" element={<Coupons />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer/:id" element={<Customer />} />
          <Route path="music" element={<Music />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="moderninvoice" element={<ModernInvoice />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
