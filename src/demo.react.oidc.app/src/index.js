import React from 'react';
import ReactDOM from 'react-dom';
import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider, useAuth, hasAuthParams } from 'react-oidc-context';
import './index.css';

function App() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = React.useState(false);

  // setup auth events
  React.useEffect(() => {
    // the `return` is important - addAccessTokenExpiring() returns a cleanup function
    return auth.events.addAccessTokenExpiring(() => {
      const message =
        "You're about to be signed out due to inactivity. Press continue to stay signed in.";
      if (alert(message)) {
        auth.signinSilent();
      }
    });
  }, [auth.events, auth.signinSilent]);

  // automatically sign-in
  React.useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinSilent(); //or auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    console.log(auth.user?.profile);
    return (
      <div>
        <p>Hello {auth.user?.profile?.name}!</p>
        {['sub', 'email', 'given_name', 'family_name', 'website'].map(
          (property) => (
            <div>
              <strong>{property}:</strong> {auth.user?.profile[property]}
            </div>
          )
        )}
        <button
          onClick={() => {
            auth.signoutRedirect({
              id_token_hint: auth.user?.id_token,
            });
            auth.removeUser();
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div>
      {auth.error && <p>Oops... {auth.error.message}</p>}
      <button onClick={() => auth.signinRedirect()}>Log in</button>
    </div>
  );
}

ReactDOM.render(
  <AuthProvider
    authority='https://localhost:5001'
    client_id='demo.react.app'
    scope='offline_access openid profile email demo.read demo.write'
    redirect_uri='https://localhost:3000/signin-oidc'
    post_logout_redirect_uri='https://localhost:3000/signout-callback-oidc'
    userStore={new WebStorageStateStore({ store: window.localStorage })}
    onSigninCallback={() => {
      window.history.replaceState({}, document.title, window.location.pathname);
    }}
    loadUserInfo={true}
  >
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
