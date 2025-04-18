
import React from "react";
import { useNavigate } from "react-router-dom";
import InteractiveBackground from "@/components/InteractiveBackground";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative">
      {/* Interactive Background */}
      <InteractiveBackground />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 flex flex-col items-center">
        <div className="w-full max-w-md mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome</h1>
          <p className="text-xl text-gray-200 mb-8">
            Experience our interactive authentication demo with custom UI
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/login")}
              className="bg-white text-purple-700 hover:bg-gray-100"
              size="lg"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              size="lg"
            >
              Register
            </Button>
          </div>
          
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-white">Project Features</h2>
            <ul className="text-left text-gray-200 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Custom authentication UI
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Protected dashboard routes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Interactive background animation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Responsive design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
