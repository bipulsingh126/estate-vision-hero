import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface AuthRequiredAlertProps {
  title?: string;
  description?: string;
  redirectDelay?: number;
}

const AuthRequiredAlert: React.FC<AuthRequiredAlertProps> = ({
  title = "Authentication Required",
  description = "You need to be logged in to access this page. Redirecting to login...",
  redirectDelay = 3000, // 3 seconds by default
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login after the specified delay
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/login', { replace: true });
      }, redirectDelay);

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, redirectDelay]);

  if (isAuthenticated) {
    return null; // Don't show anything if the user is authenticated
  }

  return (
    <div className="container-custom my-8">
      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <Lock className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <div className="flex gap-3 mt-4">
          <Button size="sm" onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default AuthRequiredAlert; 