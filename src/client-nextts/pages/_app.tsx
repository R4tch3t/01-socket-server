import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  AuthProvider  from './auth/authContext'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

function MyApp({ Component, pageProps }: AppProps) {
  /* return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} /> }
    </div>
  ) */
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });
  
  return(  
    <ApolloProvider client={client} >
    <AuthProvider> 
              <Component {...pageProps} />
            </AuthProvider>
    </ApolloProvider>)
}

export default MyApp
