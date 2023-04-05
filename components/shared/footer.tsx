import React from 'react';

interface FooterProps {
  year: number;
}

const Footer: React.FC<FooterProps> = ({ year }) => {
  return (
    <footer className="bg-blue-800 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {year} al amin. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
