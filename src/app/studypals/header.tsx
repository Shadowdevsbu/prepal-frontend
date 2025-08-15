import { useState } from 'react';
import Link from 'next/link';
import { MdSearch } from 'react-icons/md';
import UserNotificationBell from '@/app/components/UserNotificationBell';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationCount, setNotificationCount] = useState(3);

    return (
        <main>
            <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-3xl font-bold text-gray-900">Study Pals</h1>
                        {/* Find a Pal Button is now on the left */}
                        <Link href="/pair" passHref>
                            <span className="bg-[#6D6BA7] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 cursor-pointer">
                                Find a pal
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search study pals..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6D6BA7] pr-10 placeholder:text-[#6D6BA7]"
                            />
                            <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6D6BA7]" />
                        </div>
                        
                        <UserNotificationBell notificationCount={notificationCount} />

                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                                src="/ps.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
        </div>
        </main>
    )
}