'use client';
import { ForumButtonProps } from '@/app/admin/manage-forums/types';

export const ForumButton = ({ buttonType }: ForumButtonProps) => {
  return (
    <button
      className={`uppercase text-white rounded-full w-full py-2 px-4  ${
        buttonType === 'approve' ? 'bg-green-600   ' : 'bg-red-600  '
      } cursor-pointer  hover:bg-black/20 transition-colors duration-300 `}
    >
      {buttonType}
    </button>
  );
};
