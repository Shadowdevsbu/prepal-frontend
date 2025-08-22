"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { MdShare } from 'react-icons/md';
import ProtectedRoute from '../ProtectedRoute';
import { getSuggestions } from '@/lib/api/suggestions';
import { sendPairingRequest } from '@/lib/api/send-requests';
import { useAuthStore } from '@/store/authStore';
import Header from './header'

export default function PairPage() {
  const [partner, setPartner] = useState<{ id: string; name: string; initials: string } | null>(null);
  const [isPairing, setIsPairing] = useState(false);
  const [hasPaired, setHasPaired] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

const handlePair = async () => {
  setIsPairing(true);
  try {
    const user = useAuthStore.getState().user;
    if (!user?.course) throw new Error("Course not found for user");

    // Fetch partner suggestions from backend
    const suggestions = await getSuggestions(user.course);
    console.log("Suggestions:", suggestions); // 👈 log to see results

    const suggestion = suggestions[0];
    if (!suggestion) throw new Error("No pairing suggestions available");

    // Prepare initials for UI
    const initials = suggestion.name
      ? suggestion.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
      : "?";

    // Save chosen partner to state for later request
    setPartner({
      id: suggestion.id, // 👈 this will be recipientId
      name: suggestion.name || "Unknown Partner",
      initials,
    });

  } catch (err) {
    console.error("Pairing failed:", err);
  } finally {
    setIsPairing(false);
  }
};

  const handleSendRequest = async () => {
  const user = useAuthStore.getState().user;

  if (!user?.course) {
    console.error("Course not found for user");
    return;
  }

  if (!partner?.id) {
    console.error("No partner selected");
    return;
  }

  try {
    setIsPairing(true);
    const res = await sendPairingRequest(partner.id, user.course); // 👈 partner.id IS recipientId
    console.log("Pairing request sent:", res);
    setHasPaired(true);
  } catch (err) {
    console.error("Sending request failed:", err);
  } finally {
    setIsPairing(false);
  }
};



  const handleCancel = () => {
    setIsPairing(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <div className="flex-1 flex flex-col ml-64 p-4">
          {/* Top bar */}
          <Header />

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              {isPairing ? (
                /* Pairing animation */
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Pairing...</h2>
                  <p className="text-gray-600 mb-6">
                    Please wait while we connect with your partner.
                  </p>
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6D6BA7] mx-auto mb-6"></div>
                  <button
                    onClick={handleCancel}
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : hasPaired ? (
                /* Paired successfully */
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Paired Successfully!</h2>
                  <p className="text-gray-600 mb-6">You are now connected with your partner.</p>
                  <div className="flex items-center justify-center gap-8 mb-12">
                    {/* You */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 overflow-hidden">
                        <img
                          src="/ps.png"
                          alt="You"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-700 font-semibold">You</p>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>

                    {/* Partner */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                        {partner?.initials || '??'}
                      </div>
                      <p className="text-gray-700 font-semibold">
                        {partner?.name || 'Partner'}
                      </p>
                    </div>
                  </div>
                  
                  <div className='mb-4 flex items-center justify-center gap-4'>
                    <button
                    onClick={() => setHasPaired(false)}
                    className="w-full bg-[#6D6BA7] text-white py-3 px-4 rounded-md hover:bg-[#5a5d8e] transition-colors"
                    >
                    Pair Again
                  </button>
                  <button
                      onClick={handleSendRequest}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    Send Request
                  </button>
                  </div>
                </div>
              ) : (
                /* Initial pairing screen */
                <div className="text-center">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Pair with partner</h2>
                    <MdShare className="w-6 h-6 text-gray-500 hover:text-[#6D6BA7] transition-colors cursor-pointer" />
                  </div>

                  {/* Avatars */}
                  <div className="flex items-center justify-center gap-8 mb-12">
                    {/* You */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 overflow-hidden">
                        <img
                          src="/ps.png"
                          alt="You"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-700 font-semibold">You</p>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>

                    {/* Partner placeholder */}
                    {/* Partner */}
                    <div className="text-center">
                      <div className={`w-20 h-20 ${partner ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center font-bold text-xl mb-3`}>
                        {partner?.initials || "?"}
                      </div>
                      <p className="text-gray-700 font-semibold">{partner?.name || "Partner"}</p>
                    </div>
                  </div>

                  {/* Pair button */}
                  <div className='mb-4 flex items-center justify-center gap-4'>
                    <button
                    onClick={handlePair}
                    className="w-full bg-[#6D6BA7] text-white py-3 px-4 rounded-md hover:bg-[#5a5d8e] transition-colors cursor-pointer"
                    >
                      Pair Now
                    </button>
                    <button
                      onClick={handleSendRequest}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    Send Request
                  </button>
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
