import { useState, useEffect } from "react";
import { getReceivedPreppals } from "@/lib/api/get-receivedPals";
import { prepPalStatus } from "@/lib/api/preppal-status";

type Preppal = {
  id: string;
  requester: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'pending' | 'accepted' | 'declined';
};

export default function GetReceivedPreppals() {
  const [receivedPreppals, setReceivedPreppals] = useState<Preppal[]>([]);

  useEffect(() => {
    const fetchReceivedPreppals = async () => {
      try {
        const data = await getReceivedPreppals();
        setReceivedPreppals(data);
      } catch (error) {
        console.error("Error fetching received preppals:", error);
      }
    };

    fetchReceivedPreppals();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await prepPalStatus(id, "accepted");
      setReceivedPreppals(prev =>
        prev.map(p => p.id === id ? { ...p, status: "accepted" } : p)
      );
    } catch (error) {
      console.error("Error accepting preppal:", error);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await prepPalStatus(id, "declined");
      setReceivedPreppals(prev =>
        prev.map(p => p.id === id ? { ...p, status: "declined" } : p)
      );
    } catch (error) {
      console.error("Error declining preppal:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return "bg-yellow-100 text-yellow-800";
      case 'accepted':
        return "bg-green-100 text-green-800";
      case 'declined':
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <main className="mt-8">
      <h1 className="text-black text-2xl font-bold mb-6">Received Study pals</h1>
      <ul className="space-y-4">
        {receivedPreppals.length > 0 ? (
          receivedPreppals.map(pal => (
            <li key={pal.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition gap-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#6D6BA7] text-white flex items-center justify-center font-semibold text-lg overflow-hidden">
                  {pal.requester.avatar ? (
                    <img
                      src={pal.requester.avatar}
                      alt={pal.requester.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(pal.requester.name)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg text-[#6D6BA7]">{pal.requester.name}</p>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusBadge(pal.status)}`}>
                    {pal.status.charAt(0).toUpperCase() + pal.status.slice(1)}
                  </span>
                </div>
              </div>
              {pal.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(pal.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(pal.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No received preppals found.</li>
        )}
      </ul>
    </main>
  );
}