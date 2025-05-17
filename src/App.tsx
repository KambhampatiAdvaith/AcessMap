import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddLocationPage from './pages/AddLocationPage';
import LocationDetailsPage from './pages/LocationDetailsPage';
import { AuthProvider } from './context/AuthContext';
import { LocationsProvider } from './context/LocationsContext';
import { FiltersProvider } from './context/FiltersContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocationsProvider>
          <FiltersProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/add-location" element={<AddLocationPage />} />
                  <Route path="/location/:id" element={<LocationDetailsPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </FiltersProvider>
        </LocationsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;