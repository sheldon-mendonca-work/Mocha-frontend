import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
// import { makeServer } from "./server";
import { AuthProvider } from './hooks/Contexts/AuthContext';
import { PostProvider } from './hooks/Contexts/PostContext';
import { UserProvider } from './hooks/Contexts/UserContext';
import { NotficationProvider } from './hooks/Contexts/NotificationContext';

// Call make Server
// makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <NotficationProvider>
        <AuthProvider>
          <PostProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </PostProvider>
        </AuthProvider>
      </NotficationProvider>
    </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
