// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log('🌐 API URL configurada:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las solicitudes
// En api.js
api.interceptors.request.use(
  (config) => {
    console.log('🔄 Enviando solicitud a:', config.url);
    console.log('📦 Datos de la solicitud:', config.data);
    
    // Si es una solicitud a /auth/register, modificar el formato
    if (config.url === '/auth/register' && config.method === 'post') {
      console.log('⚙️ Ajustando formato para register');
      const data = config.data;
      // Asegúrate de que los datos estén en el formato correcto
      config.data = {
        name: data.name,
        email: data.email,
        password: data.password
      };
    }
    
    // Añadir token si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas
api.interceptors.response.use(
  response => {
    console.log('✅ Respuesta API exitosa:', response.config.url, response.data);
    return response;
  },
  error => {
    console.error('❌ Error API:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status
    });
    
    // Mostrar errores de validación detallados
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      console.error('📋 Errores de validación:', error.response.data.errors);
    }
    
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  register: (userData) => {
    console.log('📝 Enviando datos de registro:', userData);
    return api.post('/auth/register', userData);
  },
  login: (credentials) => {
    console.log('🔐 Enviando credenciales de login:', credentials);
    return api.post('/auth/login', credentials);
  },
};

// Servicios de usuario
export const userService = {
  getProfile: () => api.get('/users/me'),
  getMe: () => api.get('/users/me'), 
};

// Servicios de transacciones
export const transactionService = {
  getTransactions: () => api.get('/transactions'),
  createTransaction: (transactionData) => {
    console.log('💸 Enviando datos de transacción:', transactionData);
    return api.post('/transactions', transactionData);
  },
  getTransactionById: (id) => api.get(`/transactions/${id}`),
};

export default api;