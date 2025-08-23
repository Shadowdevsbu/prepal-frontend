
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