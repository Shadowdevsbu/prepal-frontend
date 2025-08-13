'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);

  };

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-sm rounded-[24px] bg-gray-50 p-6 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-[#2C2B54]">Login to Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-[8px] border border-gray-300 p-2 text-sm focus:border-[#6D6BA7] focus:outline-none focus:ring-1"
              required
            />
          </div>


          <div>
            <label className="text-sm text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-[8px] border border-gray-300 p-2 text-sm focus:border-[#6D6BA7] focus:outline-none focus:ring-1"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-[8px] bg-[#6D6BA7] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5C5A90] mt-4"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/sign-up" className="text-[#6D6BA7] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;