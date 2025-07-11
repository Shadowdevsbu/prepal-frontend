'use client';

import { forums } from '@/constants';
import { useState } from 'react';
import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import { IoSearchOutline } from 'react-icons/io5';

const SearchComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSelectSuggestion = (item: string) => {
    setSearchTerm(item);
    setShowSuggestions(false);
  };

  const filteredSuggestions = forums.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pathname = usePathname();

  return (
    <div className="p-4   w-full  max-w-lg mx-auto  text-black">
      {pathname === '/admin/manage-forums' && (
        <>
          <div
            className={`relative   hover:border-2  hover:border-purple-1  ${
              showSuggestions ? 'rounded-t-md ' : 'rounded-full  border-white '
            }`}
          >
            <div
              className={`flex items-center justify-between bg-white px-6 py-4  shadow w-full  ${
                showSuggestions
                  ? 'rounded-t-md border-gray-300 border-b '
                  : 'rounded-full border-transparent'
              }`}
            >
              <input
                type="text"
                placeholder="Search forums..."
                value={searchTerm}
                onChange={handleChange}
                className="border-none outline-0       w-full  "
              />
              <div className="text-purple-1 flex items-center justify-end ">
                <IoSearchOutline className="h-6 w-6" />
              </div>
            </div>

            <div
              className={`absolute z-10 w-full bg-white border-x border-b border-gray-300 shadow transition-all duration-300 overflow-hidden
          ${
            showSuggestions && filteredSuggestions.length > 0
              ? 'max-h-60 opacity-100'
              : 'max-h-0 opacity-0'
          }
        `}
              style={{ top: '100%' }}
            >
              <ul>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectSuggestion(item.name)}
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No suggestions found.</li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchComponent;
