import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Accessibility, MapPin, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isMapPage = location.pathname === '/map';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || isMapPage
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Accessibility className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">AccessMap</span>
            </Link>
            
            <nav className="hidden md:ml-6 md:flex md:space-x-6">
              <NavLink to="/" isActive={location.pathname === '/'}>
                Home
              </NavLink>
              <NavLink to="/map" isActive={location.pathname === '/map'}>
                <MapPin className="w-4 h-4 mr-1" />
                Explore Map
              </NavLink>
              <NavLink to="/add-location" isActive={location.pathname === '/add-location'}>
                Add Location
              </NavLink>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-800 hover:text-blue-600 transition-colors">
                  <User className="w-5 h-5 mr-1" />
                  <span>{user?.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" isActive={location.pathname === '/'}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/map" isActive={location.pathname === '/map'}>
              <MapPin className="w-4 h-4 mr-1" />
              Explore Map
            </MobileNavLink>
            <MobileNavLink to="/add-location" isActive={location.pathname === '/add-location'}>
              Add Location
            </MobileNavLink>
            
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/profile" isActive={location.pathname === '/profile'}>
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </MobileNavLink>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-3 py-2 text-base text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" isActive={location.pathname === '/login'}>
                  <LogIn className="w-4 h-4 mr-1" />
                  Log In
                </MobileNavLink>
                <MobileNavLink
                  to="/register"
                  isActive={location.pathname === '/register'}
                  highlight
                >
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'text-blue-600'
        : 'text-gray-800 hover:text-blue-600'
    }`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  highlight?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, children, highlight }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 text-base rounded-md ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : highlight
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </Link>
);

export default Header;