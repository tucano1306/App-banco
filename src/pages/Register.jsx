import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro de Cuenta</h1>
        
        <RegisterForm />
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;