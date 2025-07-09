'use client';

import { forums } from '@/constants';
import Image from 'next/image';
import { ForumButton } from './ForumButton';

const ForumCard = () => {
  return (
    <div className=" flex flex-col max-w-5xl gap-7">
      {forums.map((forum) => (
        <div key={forum.id} className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center gap-4 p-7 ">
            <Image
              src={forum.image}
              alt={forum.name}
              width={100}
              height={100}
            />
            <div>
              <h3 className="text-lg font-semibold">{forum.name}</h3>
              <p className="text-gray-600">{forum.description}</p>
              <div className="flex max-w-[300px] gap-4 mt-4">
                <ForumButton buttonType="approve" />
                <ForumButton buttonType="reject" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumCard;
