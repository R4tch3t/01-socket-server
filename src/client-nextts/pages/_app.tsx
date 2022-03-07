import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  AuthProvider, { useAppContext }  from './auth/authContext'

function MyApp({ Component, pageProps }: AppProps) {
  /* return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} /> }
    </div>
  ) */
  /*const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });*/

  return(  
    <AuthProvider> 
        <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
