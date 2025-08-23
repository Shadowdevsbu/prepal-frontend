import { getCurrentPreppals } from "@/lib/api/get-current-pals";
import { useEffect, useState } from "react";

interface PrepPal {
  id: string;
  name: string;
  email: string;
  course: string;
  department: string;
  level: string;
  avatar?: string;
}

interface CurrentPal {
  id: string;
  course: string;
  requestedAt: string;
  prepPal: PrepPal;
}

export default function GetCurrentPreppals() {
  const [currentPals, setCurrentPals] = useState<CurrentPal[]>([]);

  useEffect(() => {
    const fetchCurrentPals = async () => {
      try {
        const pals = await getCurrentPreppals();
        setCurrentPals(pals || []); // fallback to [] if API returns null/undefined
      } catch (err) {
        console.error("Failed to fetch current pals:", err);
      }
    };
    fetchCurrentPals();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main>
      <h2 className="text-xl font-bold mb-4 text-black">Current Study Pals</h2>
      <ul className="text-black space-y-2">
        {currentPals.length > 0 ? (
          currentPals.map((pal) => {
            const prepPal = pal.prepPal;
            if (!prepPal) return null;

            return (
              <li
                key={pal.id}
                className="flex items-center justify-between gap-4 bg-white p-3 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6D6BA7] text-white flex items-center justify-center font-semibold text-lg overflow-hidden">
                    {prepPal.avatar ? (
                      <img
                        src={prepPal.avatar}
                        alt={prepPal.name || "User"}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(prepPal.name)
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{prepPal.name}</p>
                    <p className="text-sm text-gray-500">
                      {prepPal.course} • {prepPal.level}
                    </p>
                  </div>
                </div>

                {/* You can show requested date or course badge here */}
                <div>
                  <span className="bg-blue-100 px-4 py-1 rounded-full text-sm text-blue-600 font-medium">
                    {new Date(pal.requestedAt).toLocaleDateString()}
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <li>No current study pals found.</li>
        )}
      </ul>
    </main>
  );
}