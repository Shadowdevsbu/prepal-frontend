'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CloudIconSrc from '@/app/components/icons/Icon.svg';
import ChatbubblesSharpIconSrc from '@/app/components/icons/chatbubbles-sharp.svg';
import CopyIconSrc from '@/app/components/icons/copy.svg';
import PlusIconSrc from '@/app/components/icons/plus.svg';
import Sidebar from '@/app/components/Sidebar';
import UserNotificationBell from '@/app/components/UserNotificationBell';
import ProtectedRoute from '../ProtectedRoute';

export default function InviteToForumPage() {
  const forumLink = 'https://join.preppal.com/room/7ahx61';
  const [copySuccess, setCopySuccess] = useState('');
  const [notificationCount] = useState(2);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCopy = async () => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = forumLink;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000);
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex-1 flex flex-col ml-64">
          {/* The updated header with the button on the far left */}
          <div className="bg-gray-100 px-6 py-4 flex items-center justify-between">

            {/* Button on the far left */}
            <button
              className="bg-[#6B69A6] text-white rounded-[10px] font-semibold flex items-center justify-center gap-2 transition-colors hover:brightness-90"
              style={{
                width: '185px',
                height: '45px',
              }}
            >
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: '17px',
                  lineHeight: '1',
                  letterSpacing: '0%',
                }}
              >
                Start a Forum
              </span>
              <Image
                src={PlusIconSrc}
                alt="Plus"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            {/* Notification bell and profile photo on the far right */}
            <div className="flex items-center gap-4">
              <UserNotificationBell notificationCount={notificationCount} />
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/ps.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl p-8 rounded-[24px] w-[650px] min-h-[450px] flex flex-col items-center">
              <h2 className="text-5xl font-bold text-gray-900 mb-8 pt-4">Invite to Forum</h2>
              <div className="relative w-[270px] h-[140px] mb-10">
                <Image
                  src={CloudIconSrc}
                  alt="Cloud"
                  width={217}
                  height={102}
                  className="absolute"
                  style={{
                    top: '34px',
                    left: '27.1px',
                    filter: 'drop-shadow(0 0 5px rgba(109, 107, 167, 0.5))',
                    color: '#6D6BA7'
                  }}
                />
                <Image
                  src={ChatbubblesSharpIconSrc}
                  alt="Chat bubbles"
                  width={107}
                  height={100}
                  className="absolute"
                  style={{
                    top: '0px',
                    left: '164px',
                    color: '#C4C4C4'
                  }}
                />
              </div>
              <div className="w-full flex flex-col items-center mb-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    readOnly
                    value={forumLink}
                    className={`w-full h-[60px] bg-[#D4D4D4] border border-[#D4D4D4] rounded-2xl pl-6 pr-14 text-gray-700 text-xl font-medium transition-all ${isInputFocused ? 'ring-4 ring-[#b8a1ff]' : ''
                      }`}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Copy link"
                  >
                    <Image
                      src={CopyIconSrc}
                      alt="Copy"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </button>
                  {copySuccess && (
                    <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-green-600 animate-fade-in-out">
                      {copySuccess}
                    </p>
                  )}
                </div>
              </div>
              <button className="w-full h-[60px] rounded-2xl bg-[#6B69A6] text-white font-semibold text-2xl hover:brightness-95 transition-all">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}