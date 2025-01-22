import React from 'react';

const AuthLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
      <div className="mb-2 bg-black text-white text-center rounded-lg p-3">
        <h1 className="text-xl sm:text-2xl font-bold">Bloggy</h1>
      </div>
      <div className="w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-black mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
