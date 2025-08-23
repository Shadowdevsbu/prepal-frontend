// src/app/components/TimetableIllustration.tsx
"use client";

import Image from 'next/image';

interface TimetableIllustrationProps {
  onCreatePlanClick: () => void;
}

export default function TimetableIllustration({ onCreatePlanClick }: TimetableIllustrationProps) {
  return (
    <div className="opacity-100 bg-white rounded-xl p-8 flex flex-col items-center justify-center max-w-2xl mx-auto my-auto">
      {/* Illustration Image */}
      <div className="relative w-full mb-8">
        <Image
          src="/find.jpg"
          alt="Timetable Illustration"
          width={400}
          height={250}
          layout="responsive"
          objectFit="contain"
        />
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#2C2B54] mb-2">
          Ready to Plan Your Study Schedule?
        </h3>
        <p className="text-gray-600 text-lg">
          Create organized study plans to maximize your learning potential
        </p>
      </div>

      {/* Call to Action Button */}
      <button
        onClick={onCreatePlanClick}
        className="bg-purple-1 text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 text-lg"
      >
        Get Started - Create Plan
      </button>
    </div>
  );
}