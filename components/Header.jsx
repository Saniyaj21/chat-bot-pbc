'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaPlus, FaEdit, FaHistory, FaBars, FaTimes, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { SignOutButton, useAuth } from '@clerk/nextjs';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  const { isLoaded, userId } = useAuth();

  const isSignedIn = isLoaded && !!userId;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='bg-blue-600 text-white shadow-md'>
      <nav className='container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <FaRobot className='text-xl' />
          <Link href={'/'} className='text-xl font-bold hover:text-blue-100 transition-colors'>
            ChatBotAI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          {isSignedIn ? (
            <>
              <Link
                onClick={() => setActiveTab('create')}
                href={'/create-chatbot'}
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors ${ activeTab === 'create' ? 'text-blue-200 ' : ''}`}
              >
                <FaPlus className='text-sm' />
                <span>Create</span>
              </Link>
              <Link
              onClick={() => setActiveTab('edit')}
                href={'/edit-chatbot'}
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors ${ activeTab === 'edit' ? 'text-blue-200 ' : ''}`}
              >
                <FaEdit className='text-sm' />
                <span>Edit</span>
              </Link>
              <Link
              onClick={() => setActiveTab('session')}
                href={'/review-sessions'}
                className={`flex items-center gap-1 hover:text-gray-200 transition-colors ${ activeTab === 'session' ? 'text-blue-200 ' : ''}`}
              >
                <FaHistory className='text-sm' />
                <span>Sessions</span>
              </Link>

              <span className='flex items-center gap-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors font-medium'>
                <SignOutButton />
              </span>
            </>
          ) : (
            <Link
              href={'/sign-in'}
              className='flex items-center gap-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors font-medium'
            >
              {/* <FaUserPlus className='text-sm' /> */}
              <span>Sign Up</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className='md:hidden text-white focus:outline-none'
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden absolute top-16 left-0 right-0 bg-blue-600 shadow-lg z-50'>
            <div className='container mx-auto px-4 py-2 flex flex-col space-y-3'>
              {isSignedIn ? (
                <>
                  <Link
                    href={'/create-chatbot'}
                    className='flex items-center gap-2 py-2 hover:text-blue-100 transition-colors'
                    onClick={toggleMobileMenu}
                  >
                    <FaPlus className='text-sm' />
                    <span>Create Chatbot</span>
                  </Link>
                  <Link
                    href={'/edit-chatbot'}
                    className='flex items-center gap-2 py-2 hover:text-blue-100 transition-colors'
                    onClick={toggleMobileMenu}
                  >
                    <FaEdit className='text-sm' />
                    <span>Edit Chatbot</span>
                  </Link>
                  <Link
                    href={'/review-sessions'}
                    className='flex items-center gap-2 py-2 hover:text-blue-100 transition-colors'
                    onClick={toggleMobileMenu}
                  >
                    <FaHistory className='text-sm' />
                    <span>Review Sessions</span>
                  </Link>
                  <span className=' flex items-center justify-center gap-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors font-medium'>
                    <SignOutButton />
                  </span>
                </>
              ) : (
                <Link
                  href={'/sign-in'}
                  className='flex items-center justify-center gap-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors font-medium'
                >
                  {/* <FaUserPlus className='text-sm' /> */}
                  <span>Sign Up</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;