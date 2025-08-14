import React from 'react';
import { MdPlayCircleOutline, MdArrowForward } from 'react-icons/md';
import Link from 'next/link'; 

const ForumCard: React.FC = () => {
  const recentForumPosts = [
    "Troubleshooting Next.js API Routes",
    "Best Practices for Tailwind CSS",
    "Understanding React Hooks: useState vs useEffect",
    "Deployment Strategies for Vercel"
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold text-[#2C2B54] mt-4">Recent Forum Posts</h2>
        </div>
        <p className="text-sm text-black mb-4"></p>
        <div className="space-y-2 mb-4 text-black">
          {recentForumPosts.map((post, index) => ( 
            <div key={index} className="flex items-center">
              <span className="mr-2 text-[#6D6BA7]">
                <MdPlayCircleOutline size="1.2em" /> 
              </span>
              <span className="text-sm text-gray-700">{post}</span> 
            </div>
          ))}
        </div>
      </div>
      <Link href="/forums">
      <button className="flex items-center text-[#6D6BA7] font-medium text-sm hover:underline self-end">
        View All Posts 
        <span className="ml-1">
          <MdArrowForward size="1em" />
        </span>
      </button>
      </Link>

    </div>
  );
};

export default ForumCard;