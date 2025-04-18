
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InteractiveBackground from '@/components/InteractiveBackground';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <InteractiveBackground />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Oops! Page not found</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-white text-purple-700 hover:bg-gray-100"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
