import { useState, useEffect } from "react";
import { getSentPreppals } from "@/lib/api/get-sentPals";

interface SentPal {
    id: string;
    status: 'pending' | 'accepted' | 'declined';
    recipient: {
        id: string;
        name: string;
        avatar?: string;
    };
}

export default function GetSentPals() {
    const [sentPals, setSentPals] = useState<SentPal[]>([]);

    useEffect(() => {
        const fetchSentPals = async () => {
            const data = await getSentPreppals();
            setSentPals(data);
        };
        fetchSentPals();
    }, []);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <main>
            <h1 className="text-black text-xl font-bold mb-4">Sent Study Pals</h1>
            <ul className="text-black space-y-2">
                {sentPals.length > 0 ? (
                    sentPals.map((pal) => (
                        <li key={pal.id} className="flex items-center justify-between gap-4 bg-white p-3 rounded shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#6D6BA7] text-white flex items-center justify-center font-semibold text-lg">
                                    {pal.recipient.avatar ? (
                                        <img 
                                            src={pal.recipient.avatar} 
                                            alt={pal.recipient.name} 
                                            className="w-full h-full rounded-full object-cover" 
                                        />
                                    ) : (
                                        getInitials(pal.recipient.name)
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold">{pal.recipient.name}</p>
                                </div>
                            </div>

                            <div>
                                {pal.status === 'pending' && <span className="bg-amber-200 px-4 py-2 rounded-full text-sm text-yellow-500 font-semibold">Pending</span>}
                                {pal.status === 'accepted' && <span className="bg-green-200 px-4 py-2 rounded-full text-sm text-green-500 font-semibold">Accepted</span>}
                                {pal.status === 'declined' && <span className="bg-red-200 px-4 py-2 rounded-full text-sm text-red-500 font-semibold">Declined</span>}
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No sent study pals found.</li>
                )}
            </ul>
        </main>
    );
}
