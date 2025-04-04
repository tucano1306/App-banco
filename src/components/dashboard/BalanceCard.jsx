import React from 'react';

const BalanceCard = ({ balance, accountNumber }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tu Saldo</h2>
        <span className="text-sm text-gray-500">Actualizado al {new Date().toLocaleString()}</span>
      </div>
      
      <div className="text-4xl font-bold text-primary mb-4">
        ${parseFloat(balance).toFixed(2)}
      </div>
      
      <div className="text-sm text-gray-600">
        <p>Número de cuenta: <span className="font-medium">{accountNumber}</span></p>
      </div>
    </div>
  );
};

export default BalanceCard;