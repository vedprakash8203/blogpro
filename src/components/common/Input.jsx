import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  name,
  className = '',
  required = false,
  disabled = false,
  label,
  error
}) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${error ? 'border-red-500' : ''}`}
        required={required}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
