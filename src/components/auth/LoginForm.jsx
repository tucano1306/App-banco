import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

const LoginForm = () => {
  const { login, error: authError } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('📝 Datos de formulario a enviar:', data);
      
      await login({
        email: data.email,
        password: data.password
      });
    } catch (error) {
      console.error('❌ Error capturado en formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      {authError && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {authError}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        register={register('email')}
        error={errors.email?.message}
        autoComplete="off"
      />
      
      <Input
        label="Contraseña"
        type="password"
        id="password"
        name="password"
        register={register('password')}
        error={errors.password?.message}
        autoComplete="new-password"
      />
      
      <Button type="submit" className="w-full">
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default LoginForm;