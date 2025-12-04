
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import BookingPage from './pages/BookingPage';
import AllDoctors from './pages/AllDoctors';
import AboutUs from './pages/AboutUs';
import Appointments from './pages/Appointments';
import MyProfilePage from './pages/MyProfilePage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import PatientFeedback from './pages/PatientFeedback';

function AppContent() {
    const location = useLocation();
    const hideHeaderPaths = ['/login', '/register'];
    const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100">
            {shouldShowHeader && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PatientDashboard />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
                <Route path="/all-doctors" element={<AllDoctors />} />
                <Route path="/doctor/:doctorId" element={<DoctorDetailPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/my-profile" element={<MyProfilePage />} />
                <Route path="/patient-feedback" element={<PatientFeedback />} />
            </Routes>
            {shouldShowHeader && <Footer />}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
