// src/app/forums/page.tsx
"use client";

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import React, { useState } from 'react';
import TheForumsCard from '@/app/components/TheForumsCard';
import UserNotificationBell from '@/app/components/UserNotificationBell';

interface ForumPost {
  title: string;
  author: string;
  content: string;
  link: string;
  topicImage: string;
  profilePhotos: string[];
}

type DisplayMode = 'list' | 'form';


export default function ForumsPage() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('list');
  const [allForums, setAllForums] = useState<ForumPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [forumDate, setForumDate] = useState('');
  const [forumTime, setForumTime] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const notificationCount = 5;

  const handleCreateForumClick = () => {
    setDisplayMode('form');
  };

  const handleCreateForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle || !formDescription || !forumDate || !forumTime) {
      alert('Please fill in all fields!');
      return;
    }

    const newForum: ForumPost = {
      title: formTitle,
      author: 'Current User', 
      content: formDescription,
      link: `/forums/${formTitle.toLowerCase().replace(/\s/g, '-')}`,
      topicImage: '/topic-image-default.jpg',
      profilePhotos: ['/ps.png'],
    };

    setAllForums(prevForums => [newForum, ...prevForums]);
    setFormTitle('');
    setFormDescription('');
    setForumDate('');
    setForumTime('');
    setDisplayMode('list');
  };

  const handleCancelClick = () => {
    setDisplayMode('list');
    setFormTitle('');
    setFormDescription('');
    setForumDate('');
    setForumTime('');
  };

  const filteredForums = allForums.filter(forum =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const forumsToDisplay = filteredForums.slice(0, 3);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {/* Page Header with Nav Components */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleCreateForumClick}
            className="flex items-center bg-[#6D6BA7] text-white px-5 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200"
          >
            Create Forum +
          </button>
          
          <div className="flex items-center space-x-6">
            <UserNotificationBell notificationCount={notificationCount} />
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Image src="/ps.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Forums Content */}
        {displayMode === 'list' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-[#2C2B54]">Recent Forum Post</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for forum"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6D6BA7] placeholder-gray-500 text-black"
                />
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size="1.2em" />
              </div>
            </div>
            
            <div className="space-y-6">
              {(forumsToDisplay.length > 0) ? forumsToDisplay.map((forum, index) => (
                <TheForumsCard
                  key={index}
                  title={forum.title}
                  author={forum.author}
                  content={forum.content}
                  link={forum.link}
                  topicImage={forum.topicImage}
                  profilePhotos={forum.profilePhotos}
                />
              )) : <div>There are no forums to display</div>}
            </div>
          </div>
        )}

        {displayMode === 'form' && (
          <div className="bg-white rounded-xl p-8 flex flex-col justify-center max-w-2xl mx-auto my-auto min-h-[450px]">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">Create a Forum</h2>
            <form onSubmit={handleCreateForumSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="forumTitle" className="block text-lg font-semibold text-gray-900 mb-2">Title</label>
                <div className="relative">
                  <input
                    type="text"
                    id="forumTitle"
                    className="w-full p-3 border-1 border-[#6D6BA7] rounded-3xl outline-none text-black"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="forumDescription" className="block text-lg font-semibold text-gray-900 mb-2">Description</label>
                <div className="relative">
                  <textarea
                    id="forumDescription"
                    rows={4}
                    className="w-full p-3 border-1 border-[#6D6BA7] rounded-3xl outline-none text-black"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className='flex gap-4 mb-6'>
                <div className="flex-1">
                  <label htmlFor="forumDate" className="block text-lg font-semibold text-gray-900 mb-2">Forum Date</label>
                  <div>
                    <input
                      type="date"
                      id="forumDate"
                      placeholder='Use Calendar'
                      className='w-full p-3 border-1 border-[#6D6BA7] rounded-full outline-none text-black placeholder-gray-500'
                      value={forumDate}
                      onChange={(e) => setForumDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <label htmlFor="forumTime" className="block text-lg font-semibold text-gray-900 mb-2">Forum Time</label>
                  <div>
                    <input
                      type="time"
                      id="forumTime"
                      placeholder='Use Time...'
                      className='w-full p-3 border-1 border-[#6D6BA7] rounded-full outline-none text-black placeholder-gray-500'
                      value={forumTime}
                      onChange={(e) => setForumTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-auto pt-8">
                <button
                  type="submit"
                  className="bg-[#6D6BA7] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 text-lg w-64"
                >
                  Create Forum
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors duration-200 text-lg w-64"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}