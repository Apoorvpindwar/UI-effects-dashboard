
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User, BarChart3, Activity, Box, Lock } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Mock data for dashboard
  const stats = [
    { title: 'Total Users', value: '1,254', icon: User, color: 'bg-blue-500' },
    { title: 'Conversions', value: '24%', icon: BarChart3, color: 'bg-green-500' },
    { title: 'Active Sessions', value: '432', icon: Activity, color: 'bg-purple-500' },
    { title: 'Projects', value: '64', icon: Box, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl font-bold">Protected Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{user?.name || 'User'}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Protected Content</CardTitle>
              <CardDescription>
                This page is only accessible to authenticated users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This is an example of protected content that requires authentication to access. 
                You are currently logged in as <strong>{user?.email}</strong>.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
