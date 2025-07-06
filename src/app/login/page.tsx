"use client";

import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white overflow-hidden rounded-2xl shadow-lg">
        {/* Curved background design elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gray-300 rounded-full opacity-70"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gray-300 rounded-full opacity-50"></div>
        </div>
        
        {/* Form content */}
        <div className="relative z-10 px-8 py-12">
          <h1 className="text-2xl font-bold text-black mb-8">
            Login to Account
          </h1>
          
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-gray-50 text-base focus:outline-none focus:border-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-gray-50 text-base focus:outline-none focus:border-gray-400"
              />
            </div>

            {/* Sign In Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full text-white font-semibold py-4 px-4 rounded-xl transition-colors text-base hover:opacity-90"
                style={{ backgroundColor: '#6D6BA7' }}
              >
                Sign in
              </button>
            </div>
          </div>

          {/* Don't have an account link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-base">
              Don't have an account?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}