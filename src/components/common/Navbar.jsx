import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Banco App</Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:text-primary-light">Dashboard</Link>
              <Link to="/transactions" className="hover:text-primary-light">Transacciones</Link>
              <Link to="/transfer" className="hover:text-primary-light">Transferir</Link>
              <button 
                onClick={logout} 
                className="hover:text-primary-light"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary-light">Iniciar Sesión</Link>
              <Link to="/register" className="hover:text-primary-light">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;