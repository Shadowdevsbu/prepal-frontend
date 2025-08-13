'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axios } from '@/lib/api/axios';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    course: '',
    level: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = axios.post

  };

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-sm rounded-[24px] bg-gray-50 p-6 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-[#2C2B54]">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-[8px] border border-gray-300 p-2 text-sm focus:border-[#6D6BA7] focus:outline-none focus:ring-1"
              required
            />
          </div>

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

          <div>
            <label className="text-sm text-gray-700" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 w-full rounded-[8px] border border-gray-300 p-2 text-sm focus:border-[#6D6BA7] focus:outline-none focus:ring-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700" htmlFor="course">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="mt-1 w-full rounded-[8px] border border-gray-300 p-2 text-sm focus:border-[#6D6BA7] focus:outline-none focus:ring-1]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700" htmlFor="level">Level</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-1 w-full rounded-[8px] border border-gray-300 p-2 text-sm focus:border-[#6D6BA7] focus:outline-none focus:ring-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-[8px] bg-[#6D6BA7] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5C5A90] mt-4"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-600">
          Already have an account?{' '}
          <a href="/auth/sign-in" className="text-[#6D6BA7] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;