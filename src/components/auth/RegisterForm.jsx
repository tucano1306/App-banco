import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
});

const RegisterForm = () => {
  const { register: registerUser, error: authError } = useAuth();
  
  // RegisterForm.jsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
});

  const onSubmit = async (data) => {
    try {
      // Imprimir los datos para depuración
      console.log('Datos del formulario de registro:', data);
      
      // Verificar que los datos no estén vacíos
      if (!data.name || !data.email || !data.password) {
        console.error('❗ Datos incompletos en el formulario:', data);
        return; // No continuar si faltan datos
      }
      
      // Eliminar confirmPassword para evitar enviarlo al backend
      const { confirmPassword, ...userData } = data;
      
      console.log('Datos a enviar al backend:', userData);
      
      await registerUser(userData);
    } catch (error) {
      console.error('Error en el registro:', error);
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
        label="Nombre"
        type="text"
        id="name"
        name="name"
        register={register('name')}
        error={errors.name?.message}
        autoComplete="off"
      />
      
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
      
      <Input
        label="Confirmar Contraseña"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        register={register('confirmPassword')}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
      />
      
      <Button type="submit" className="w-full">
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;