import React from 'react';

function UpdateMessage({ message, isError }) {
  if (!message) return null;

  const baseClasses = 'fixed bottom-0 left-0 right-0 px-4 py-3 text-sm';
  const successClasses = 'bg-green-500 text-white';
  const errorClasses = 'bg-red-500 text-white';

  const className = `${baseClasses} ${isError ? errorClasses : successClasses}`;

  return (
    <div className={className} role="alert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default UpdateMessage;
