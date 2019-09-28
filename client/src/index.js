import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/main.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import AuthProvider from './context/AuthContext'

const Client = new ApolloClient({
   uri: '/graphql',
   request: operation => {
      const token = localStorage.getItem('token')
      operation.setContext({
         headers: {
            Authorization: token ? token : ''
         }
      })
   }
})

ReactDOM.render(
   <ApolloProvider client={Client}>
      <AuthProvider>
         <Router>
            <App />
         </Router>
      </AuthProvider>
   </ApolloProvider>, document.getElementById('root'));