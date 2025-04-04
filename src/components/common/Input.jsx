import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  id, 
  placeholder = '', 
  register, 
  error, 
     ...rest 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
  type={type}
  id={id}
  name={name}
  className={`input w-full ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
  placeholder={placeholder}
  {...register} // Esta línea es crucial
  {...rest}
/>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;