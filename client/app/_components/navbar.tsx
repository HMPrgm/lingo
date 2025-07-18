'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLoggedIn } from '../auth/page';

interface NavbarLinks {
  href: string;
  label: string;
}

// Define the navigation links
const navLinks: NavbarLinks[] = [
  { href: '/', label: 'Home' },
  { href: '/vocab', label: 'Vocab' },

];

const loggedInLinks: NavbarLinks[] = [
  { href: '/auth', label: 'Profile' },
];

const loggedOutLinks: NavbarLinks[] = [
  { href: '/auth', label: 'Login' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Hook to get the current path
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const result = await (await isLoggedIn())();
      setLoggedIn(result);
    };
    checkLoggedIn();
  }, []);

  return (
    <nav className="bg-light shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-dark">
              Lingo
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {webLinks(navLinks, pathname)}
              {loggedIn ? webLinks(loggedInLinks, pathname) : webLinks(loggedOutLinks, pathname)}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-light-2 hover:text-light hover:bg-dark-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (collapsible) */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mobileLinks(navLinks, pathname, setIsOpen)}
            {loggedIn ? mobileLinks(loggedInLinks, pathname, setIsOpen) : mobileLinks(loggedOutLinks, pathname, setIsOpen)}
          </div>
        </div>
      )}
    </nav>
  );
}

function webLinks(links: NavbarLinks[], pathname: string) {
  return links.map((link) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.label}
        href={link.href}
        className={`px-3 py-2 rounded-md text-sm font-medium ${isActive
          ? 'bg-dark text-light'
          : 'text-dark hover:bg-dark-2 hover:text-light'
          } transition-colors duration-300`}
      >
        {link.label}
      </Link>
    );
  })
}

function mobileLinks(navLinks: NavbarLinks[], pathname: string, setIsOpen: (isOpen: boolean) => void) {
  return navLinks.map((link) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => setIsOpen(false)} // Close menu on click
        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
          ? 'bg-dark text-light'
          : 'text-dark hover:bg-dark-2 hover:text-light'
          }`}
      >
        {link.label}
      </Link>
    );
  })
}

