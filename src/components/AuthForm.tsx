
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === 'login') {
        await login(email, password);
        toast({
          title: "Success!",
          description: "You have been logged in.",
        });
        navigate(from);
      } else {
        await register(name, email, password);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            {type === 'login' && (
              <a href="#" className="text-sm text-purple-300 hover:text-purple-200">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {type === 'login' ? 'Signing In...' : 'Creating Account...'}
            </>
          ) : (
            type === 'login' ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-gray-300">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <a 
              onClick={() => navigate('/register')}
              className="text-purple-300 hover:text-purple-200 cursor-pointer" 
            >
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a 
              onClick={() => navigate('/login')}
              className="text-purple-300 hover:text-purple-200 cursor-pointer" 
            >
              Sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
