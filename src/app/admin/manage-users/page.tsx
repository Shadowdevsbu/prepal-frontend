/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/admin/manage-users.page.tsx
"use client";
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import SearchBar from '@/app/components/AdminComponents/SearchBar';
import User from '@/app/components/illustrations/user.png'

interface UserCardProps {
  image: string | StaticImageData | null;
  name: string;
  course: string;
  level: number
}

// User card
function UserCard({ image, name, course, level }: UserCardProps) {
  return (
    < div className='shadow-custom-shadow flex flex-col items-center gap-1 w-10/12 text-black rounded-xl bg-white p-4' >
      {image && <Image 
      src={image}
        alt={name}
        width={100}
        height={100}
        className="rounded-full object-cover" />}
      <h3 className='capitalise text-xl font-bold'>{name}</h3>
      <p className='font-medium text-lg'>{course}</p>
      <p className='font-medium text-base'>{level} level</p>
    </div >
  )
}

export default function ManageUsers() {
  const [users, setUsers] = useState<UserCardProps[]>([
    {
      image: User,
      name: "Jane Doe",
      course: "Computer Science",
      level: 300,
    },
    {
      image: User,
      name: "John Smith",
      course: "Electrical Engineering",
      level: 200,
    },
    {
      image: User,
      name: "Jane Doe",
      course: "Computer Science",
      level: 300,
    },
    {
      image: User,
      name: "John Smith",
      course: "Electrical Engineering",
      level: 200,
    },
  ])
  return (
    <div className="">
      <header className="flex items-center justify-between space-x-4 mb-10">
        {/* Searcg functionality */}
        <SearchBar placeHolderText='Searching User...' />
        {/* Header icons - notification and profile */}
        <div className='flex items-center justify-end space-x-4 mb-6'>
          <div className="relative">
            <Image
              src="/bell.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              5
            </span>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/profile-placeholder.png"
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>
      <section className='relative w-full h-full grid grid-cols-2 gap-y-8'>
        {
          users && users.length != 0 ?
            (
              users.map((user, index) => (
                <UserCard key={index} image={user.image} name={user.name} course={user.course} level={user.level}
                />
              ))
            ) : (<p className='text-black absolute inset-0 h-full w-full m-auto text-center'>No users found</p>)
        }
      </section>
    </div>
  );
}