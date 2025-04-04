import React from 'react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transacciones Recientes</h2>
        <p className="text-gray-500">No hay transacciones recientes.</p>
      </div>
    );
  }

  // Mostrar solo las 5 transacciones más recientes
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Transacciones Recientes</h2>
        <Link to="/transactions" className="text-primary hover:underline">
          Ver todas
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left text-gray-600">Fecha</th>
              <th className="py-2 text-left text-gray-600">Tipo</th>
              <th className="py-2 text-left text-gray-600">Contraparte</th>
              <th className="py-2 text-right text-gray-600">Monto</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-3 text-gray-800">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    transaction.type === 'enviado' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {transaction.type === 'enviado' ? 'Enviado' : 'Recibido'}
                  </span>
                </td>
                <td className="py-3 text-gray-800">{transaction.counterparty.name}</td>
                <td className={`py-3 text-right font-medium ${
                  transaction.type === 'enviado' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'enviado' ? '-' : '+'} 
                  ${parseFloat(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;