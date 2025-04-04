import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, userService } from '../services/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../components/common/CustomToasts';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Comprobar si hay un token guardado al iniciar
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Obtener información del usuario
          const response = await userService.getProfile();
          setUser(response.data || response);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      // Extraer token y datos de usuario de la respuesta
      const token = response.data?.token || response.token;
      const userData = response.data?.user || response.user;
      
      // Guardar token
      localStorage.setItem('token', token);
      
      // Establecer usuario
      setUser(userData);
      
      // Mostrar notificación de éxito con componente personalizado
      showSuccessToast('¡Inicio de sesión exitoso! Bienvenido/a.');
      
      // Redireccionar al dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000); // Pequeño retraso para que la notificación sea visible
      
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      
      // Mostrar notificación de error con componente personalizado
      showErrorToast(errorMessage);
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrarse
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      
      // Extraer token y datos de usuario de la respuesta
      const token = response.data?.token || response.token;
      const userInfo = response.data?.user || response.user;
      
      // Guardar token
      localStorage.setItem('token', token);
      
      // Establecer usuario
      setUser(userInfo);
      
      // Mostrar notificación de éxito con componente personalizado
      // Actualiza este mensaje para incluir la información del correo
       showSuccessToast('¡Registro exitoso! Hemos enviado un correo de confirmación a tu dirección de email.');
      
      // Redireccionar al dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000); // Pequeño retraso para que la notificación sea visible
      
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
      setError(errorMessage);
      
      // Mostrar notificación de error con componente personalizado
      showErrorToast(errorMessage);
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    
    // Mostrar notificación de información con componente personalizado
    showInfoToast('Has cerrado sesión correctamente');
    
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser: user, 
      loading, 
      error, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};