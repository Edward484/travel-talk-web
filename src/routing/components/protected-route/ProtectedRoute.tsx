import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  validation: () => boolean;
  /**
   * An element to show before the validation function is run the first time
   */
  loadingElement?: ReactElement;
  /**
   * Where to redirect the user if they are not allowed to see this route
   */
  fallbackRoute: string;
}

type CanAccessState = 'loading' | 'allowed' | 'forbidden';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  validation,
  loadingElement,
  fallbackRoute,
  children,
}) => {
  const [canAccess, setCanAccess] = useState<CanAccessState>(
    loadingElement ? 'loading' : validation() ? 'allowed' : 'forbidden',
  );

  //Recheck the validation of the route
  useEffect(() => {
    setCanAccess(validation() ? 'allowed' : 'forbidden');
  }, [validation]);

  switch (canAccess) {
    case 'loading':
      return loadingElement ?? null;
    case 'forbidden':
      // The user is not allowed to see this route, navigate him away and render  a blank route while the navigation takes place
      return <Navigate to={fallbackRoute} />;
    case 'allowed':
      return <>{children ?? null}</>;
  }
};

export default ProtectedRoute;
