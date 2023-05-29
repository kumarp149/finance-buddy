import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ProtectedRoute = ({ component: Component, isPrivate, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      if (isPrivate) {
        history.push('/login');
      }
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : isPrivate ? (
          null
        ) : (
          <NotFoundPage />
        )
      }
    />
  );
};

const NotFoundPage = () => {
  return <h1>404 - Page Not Found</h1>;
};

export default ProtectedRoute;
