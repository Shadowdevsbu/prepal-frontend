"use client";

import { useState } from "react";
import GetReceivedPreppals from "./get-receivedPals";
import GetSentPals from "./get-sentPals";
import GetCurrentPreppals from "./get-currentPals";

export default function ToggleNav() {
  const [activeTab, setActiveTab] = useState<"received" | "sent" | "current">(
    "received"
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Study Pal Requests
      </h1>

      {/* Toggle Navigation */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
            activeTab === "received"
              ? "bg-[#6D6BA7] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Received
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
            activeTab === "sent"
              ? "bg-[#6D6BA7] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sent
        </button>
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
            activeTab === "current"
              ? "bg-[#6D6BA7] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Current
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <div>
        {activeTab === "received" && <GetReceivedPreppals />}
        {activeTab === "sent" && <GetSentPals />}
        {activeTab === "current" && <GetCurrentPreppals />}
      </div>
    </main>
  );
}