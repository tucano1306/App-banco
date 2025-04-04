import React from 'react';
import Layout from '../components/common/Layout';
import TransactionForm from '../components/transactions/TransactionForm';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const navigate = useNavigate();

  const handleTransactionSuccess = () => {
    // Redirigir al historial de transacciones después de 2 segundos
    setTimeout(() => {
      navigate('/transactions');
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Realizar Transferencia</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <TransactionForm onTransactionSuccess={handleTransactionSuccess} />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Las transferencias son procesadas inmediatamente.</p>
          <p>Recuerda verificar el número de cuenta del destinatario antes de confirmar.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Transfer;