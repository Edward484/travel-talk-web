import React, { ReactElement, useEffect, useState } from 'react';
import {
  IndexRouteProps,
  LayoutRouteProps,
  PathRouteProps,
  Route,
  useNavigate,
  useRoutes,
} from 'react-router';

type ProtectedRouteProps = (
  | PathRouteProps
  | LayoutRouteProps
  | IndexRouteProps
) & {
  validation: () => boolean;
  /**
   * An element to show before the validation function is run the first time
   */
  loadingElement?: ReactElement;
  /**
   * Where to redirect the user if they are not allowed to see this route
   */
  fallbackRoute: string;
};

type CanAccessState = 'loading' | 'allowed' | 'forbidden';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  validation,
  loadingElement,
  fallbackRoute,
  ...props
}) => {
  const [canAccess, setCanAccess] = useState<CanAccessState>(
    loadingElement ? 'loading' : validation() ? 'allowed' : 'forbidden',
  );

  const navigate = useNavigate();

  //Recheck the validation of the route
  useEffect(() => {
    setCanAccess(validation() ? 'allowed' : 'forbidden');
  }, [validation]);

  switch (canAccess) {
    case 'loading':
      return <Route {...props} element={loadingElement} />;
    case 'forbidden':
      // The user is not allowed to see this route, navigate him away and render  a blank route while the navigation takes place
      navigate(fallbackRoute);
      return <Route {...props} element={undefined} />;
    case 'allowed':
      return <Route {...props} />;
  }
};

export default ProtectedRoute;
