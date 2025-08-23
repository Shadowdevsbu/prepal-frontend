import React from 'react';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';
import Link from 'next/link';

const StudyPalCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start h-full">
      {/* Left content */}
      <div className="flex-1 flex flex-col justify-between h-full text-center md:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2C2B54] mb-2 mt-4">
            Find a Study Pal
          </h2>
          <p className="text-base sm:text-lg font-medium text-black mb-1 pr-0 md:pr-4">
            Pair up with other students
          </p>
          <p className="text-base sm:text-lg font-medium text-black mb-1 pr-0 md:pr-4">
            based on
          </p>
          <p className="text-base sm:text-lg font-medium text-black mb-4 pr-0 md:pr-4">
            your courses.
          </p>

          <Link href="/pair">
            <button className="flex items-center justify-center md:justify-start bg-purple-1 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-[#5C5A90] transition-colors duration-200">
              Find a pal
              <span className="ml-2">
                <MdArrowForward size="1em" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Right image */}
      <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-6 w-full md:w-auto flex justify-center">
        <Image
          src="/connect.jpg"
          alt="Study Pal Illustration"
          width={230}
          height={230}
          className="rounded-lg w-40 sm:w-56 md:w-[230px] h-auto"
        />
      </div>
    </div>
  );
};

export default StudyPalCard;