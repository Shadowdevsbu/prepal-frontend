// src/components/TheForumsCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TheForumsCardProps {
  title: string;
  author: string;
  content: string;
  link: string;
  topicImage: string;
  profilePhotos: string[];
}

const TheForumsCard: React.FC<TheForumsCardProps> = ({ title, author, content, link, topicImage, profilePhotos }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">
      <div className="flex items-start space-x-4">
        {/* Square Topic Image */}
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden">
          <Image
            src={topicImage}
            alt={`Topic image for ${title}`}
            width={90}
            height={90}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-[#2C2B54] mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{content}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        {/* Profile Pictures */}
        <div className="flex -space-x-2 overflow-hidden">
          {profilePhotos.map((photo, photoIndex) => (
            <Image
              key={photoIndex}
              src={photo}
              alt={`Profile ${photoIndex + 1}`}
              width={28}
              height={28}
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
            />
          ))}
        </div>
        
        {/* Join Button */}
        <Link href={link}>
          <button className="bg-[#6D6BA7] text-white text-sm px-7 py-1 rounded-full font-medium hover:bg-[#5C5A90] transition-colors duration-200">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TheForumsCard;