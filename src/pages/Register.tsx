
import React from 'react';
import AuthForm from '@/components/AuthForm';
import InteractiveBackground from '@/components/InteractiveBackground';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <InteractiveBackground />
      
      <div className="container relative z-10 px-4 py-16">
        <Button
          variant="ghost"
          className="text-white absolute top-8 left-8 flex items-center gap-2 hover:bg-white/10"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-300 mt-2">
            Sign up to get access to all features
          </p>
        </div>
        
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default Register;
