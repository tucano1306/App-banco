import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../common/Input';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { transactionService } from '../../services/api';
import useAPI from '../../hooks/useAPI';

const schema = yup.object().shape({
  receiverAccountNumber: yup.string().required('El número de cuenta es obligatorio'),
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .positive('El monto debe ser positivo')
    .required('El monto es obligatorio'),
});

const TransactionForm = ({ onTransactionSuccess }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const { loading, error, execute: createTransaction } = useAPI(transactionService.createTransaction);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await createTransaction({
        receiverAccountNumber: data.receiverAccountNumber,
        amount: parseFloat(data.amount),
      });
      
      setSuccessMessage('Transferencia realizada con éxito');
      reset();
      
      if (onTransactionSuccess) {
        onTransactionSuccess();
      }
      
      // Limpiar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      console.error('Error al realizar la transferencia:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
      
      <Input
        label="Número de Cuenta del Destinatario"
        type="text"
        id="receiverAccountNumber"
        name="receiverAccountNumber"
        register={register('receiverAccountNumber')}
        error={errors.receiverAccountNumber?.message}
      />
      
      <Input
        label="Monto"
        type="number"
        id="amount"
        name="amount"
        register={register('amount')}
        error={errors.amount?.message}
        step="0.01"
      />
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Spinner size="sm" /> : 'Realizar Transferencia'}
      </Button>
    </form>
  );
};

export default TransactionForm;