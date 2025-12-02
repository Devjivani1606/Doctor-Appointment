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

function AppContent() {
    const location = useLocation();
    const hideHeaderPaths = ['/login', '/register'];
    const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            
            {/* Header Always on Top */}
            {shouldShowHeader && <Header />}

            {/* Main content */}
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<PatientDashboard />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
                    <Route path="/all-doctors" element={<AllDoctors />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/appointments" element={<Appointments />} />
                </Routes>
            </main>

            {/* Footer Always at Bottom */}
            <Footer />
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
