import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. get the user from the useUser hook
  const { user, isLoading, isAuthenticated } = useUser();

  //2. if not authenticated, redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate('/login');
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3. while loading, show a spinner
  if (isLoading)
    return (
      <div className="h-screen bg-grey-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  //4. if authenticated, show the children (the protected page)
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
