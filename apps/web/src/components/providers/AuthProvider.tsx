'use client';

import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const domain = 'dev-mhuy.us.auth0.com';
  const clientId = 'eEEOn1rUYzihtecwF90ulz1vprdRm9Vc';

  const [redirectUri, setRedirectUri] = React.useState('');

  React.useEffect(() => {
    setRedirectUri(window.location.origin);
  }, []);

  if (!redirectUri) {
    // Return children directly during Server-Side Rendering
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
