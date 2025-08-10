import React from 'react';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';
import Link from 'next/link'; // Import the Link component

const StudyPalCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-start h-full">
      <div className="flex-1 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-4xl font-semibold text-[#2C2B54] mb-2 mt-4">Find a Study Pal</h2>
          <p className="text-lg font-medium text-black mb-1 pr-4 text-wrap">Pair up with other students</p>
          <p className="text-lg font-medium text-black mb-1 pr-4 text-wrap">based on</p>
          <p className="text-lg font-medium text-black mb-2 pr-4 text-wrap">your courses.</p>

         
          <Link href="/pair">
            <button className="flex items-center bg-purple-1 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#5C5A90] transition-colors duration-200">
              Find a pal
              <span className="ml-2">
                <MdArrowForward size="1em" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-shrink-0 ml-4 hidden md:block">
        <Image
          src="/connect.jpg"
          alt="Study Pal Illustration"
          width={230}
          height={230}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default StudyPalCard;