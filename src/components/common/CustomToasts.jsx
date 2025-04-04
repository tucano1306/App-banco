import React from 'react';
import { toast } from 'react-toastify';

export const showSuccessToast = (message) => {
  toast.success(
    <div className="flex items-center">
      <div className="text-xl mr-2">✅</div>
      <div>
        <p className="font-bold">¡Éxito!</p>
        <p>{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: 3000,
      className: "bg-green-50 border-l-4 border-green-500",
      bodyClassName: "text-green-800",
      progressClassName: "bg-green-600",
    }
  );
};

export const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <div className="text-xl mr-2">❌</div>
      <div>
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: 4000,
      className: "bg-red-50 border-l-4 border-red-500",
      bodyClassName: "text-red-800",
      progressClassName: "bg-red-600",
    }
  );
};

export const showInfoToast = (message) => {
  toast.info(
    <div className="flex items-center">
      <div className="text-xl mr-2">ℹ️</div>
      <div>
        <p className="font-bold">Información</p>
        <p>{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: 3000,
      className: "bg-blue-50 border-l-4 border-blue-500",
      bodyClassName: "text-blue-800",
      progressClassName: "bg-blue-600",
    }
  );
};