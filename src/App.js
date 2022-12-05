import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AbilityContext } from './casl/can';
import ability from './casl/ability';
import Login from './components/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from 'react-auth-kit';
import { env } from './env';
import { useIsAuthenticated } from 'react-auth-kit';
import Dashboard from './components/Dashboard';


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
);

export default function App() {


  return (
    <MantineProvider withGlobalStyles>
    <AbilityContext.Provider value={ability}>
    <QueryClientProvider client={queryClient}>
    <AuthProvider authType = {'sessionstorage'}
                  authName={env.tokenStorageName}
                  cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}>
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
          </Routes>
        </BrowserRouter>
   
    </AuthProvider>
    </QueryClientProvider>
    </AbilityContext.Provider>
     </MantineProvider>
  );
}


const PrivateRoute = ({children}) => {
  const hasAuth = useIsAuthenticated()()
  return (
    <>
     {hasAuth ? children: <Navigate to="/login" />}
    </>);
}