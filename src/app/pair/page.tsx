"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';
import { MdShare } from 'react-icons/md';
import UserNotificationBell from '@/app/components/UserNotificationBell'; 

export default function PairPage() {
  const [isPairing, setIsPairing] = useState(false);
  const [hasPaired, setHasPaired] = useState(false);

  const handlePair = () => {
    setIsPairing(true);
    setTimeout(() => {
      setIsPairing(false);
      setHasPaired(true);
    }, 2000);
  };

  const handleCancel = () => {
    setIsPairing(false);
  };

  const [notificationCount, setNotificationCount] = useState(2);

  return (
    <div className="flex h-screen bg-gray-100">
 
      <Sidebar />

      
      <div className="flex-1 flex flex-col ml-64">
        
        <div className="bg-gray-1  00 px-6 py-4 flex items-center justify-end">
          <div className="flex items-center gap-4">
           
            <UserNotificationBell notificationCount={notificationCount} />
            
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/ps.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        </div>

       
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            {isPairing ? (
             
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pairing...</h2>
                <p className="text-gray-600 mb-6">Please wait while we connect with your partner.</p>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6D6BA7] mx-auto mb-6"></div>
                <button
                  onClick={handleCancel}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : hasPaired ? (
         
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Paired Successfully!</h2>
                <p className="text-gray-600 mb-6">You are now connected with your partner.</p>
                <div className="flex items-center justify-center gap-8 mb-12">
                
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 overflow-hidden">
                      <img src="/ps.png" alt="You" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-700 font-semibold">You</p>
                  </div>

                 
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>

              
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                      EA
                    </div>
                    <p className="text-gray-700 font-semibold">Partner</p>
                  </div>
                </div>
                <button
                  onClick={() => setHasPaired(false)}
                  className="w-full bg-[#6D6BA7] text-white py-3 px-4 rounded-md hover:bg-[#5a5d8e] transition-colors"
                >
                  Pair Again
                </button>
              </div>
            ) : (
            
              <div className="text-center">
               
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pair with partner</h2>
                  <MdShare className="w-6 h-6 text-gray-500 hover:text-[#6D6BA7] transition-colors cursor-pointer" />
                </div>

                {/* Avatars and dots */}
                <div className="flex items-center justify-center gap-8 mb-12">
                  {/* You (user) */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 overflow-hidden">
                      <img src="/ps.png" alt="You" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-700 font-semibold">You</p>
                  </div>

                  {/* Connecting dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>

                  {/* Partner placeholder */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl mb-3">
                      ?
                    </div>
                    <p className="text-gray-700 font-semibold">Partner</p>
                  </div>
                </div>

                {/* Pairing button */}
                <button
                  onClick={handlePair}
                  className="w-full bg-[#6D6BA7] text-white py-3 px-4 rounded-md hover:bg-[#5a5d8e] transition-colors"
                >
                  Pair Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}