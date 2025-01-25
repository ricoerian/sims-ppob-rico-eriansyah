// src/components/Navbar.tsx
import React, { useState } from 'react';
import Box from '../Atoms/Box';
import Image from '../Atoms/Image';
import Button from '../Atoms/Button';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='border-b border-gray-200'>
      <Box className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/dashboard">
            <Box className='flex flex-row justify-center my-auto gap-2'>
                <Image src="/assets/images/Logo.png" alt="Logo" />
                <h1 className="text-2xl font-semibold">SIMS PPOB</h1>
            </Box>
        </a>
        <Box className="hidden md:flex space-x-6">
          <a href="/topup" className="hover:text-red-300">Top Up</a>
          <a href="/transaksi" className="hover:text-red-300">Transaction</a>
          <a href="/akun" className="hover:text-red-300">Akun</a>
        </Box>
        <Button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </Button>
      </Box>
      {isMobileMenuOpen && (
        <Box className="md:hidden">
          <a href="/topup" className="block px-4 py-2 hover:bg-blue-400">Top Up</a>
          <a href="/transaksi" className="block px-4 py-2 hover:bg-blue-400">Transaction</a>
          <a href="/akun" className="block px-4 py-2 hover:bg-blue-400">Akun</a>
        </Box>
      )}
    </nav>
  );
};

export default Navbar;