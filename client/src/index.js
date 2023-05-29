// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// import { ThemeProvider } from "@aws-amplify/ui-react";
// import { Amplify } from 'aws-amplify';

// import LoginForm from './ui-components/LoginForm'

// import awsconfig from './aws-exports';

// import "@aws-amplify/ui-react/styles.css";
// import { studioTheme } from "./ui-components";

// Amplify.configure(awsconfig);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ThemeProvider theme={studioTheme}>
//     <App />
//   </ThemeProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsmobile from './aws-exports';
import App from './App';
import ProtectedRoute from './ProtectedRoute';
import E404 from './components/errors/E404';
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure(awsmobile);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/auth" component={withAuthenticator(App)}/>
        <ProtectedRoute path="/dashboard" component={App} isPrivate={true}/>
        <ProtectedRoute path="/settings" component={App} isPrivate={true}/>
        <ProtectedRoute path="/budgets" component={App} isPrivate={true}/>
        <ProtectedRoute path="/expenses" component={App} isPrivate={true}/>
        <ProtectedRoute path="/expenses/new" component={App} isPrivate={true}/>
        <ProtectedRoute path="/budgets/new" component={App} isPrivate={true}/>
        <ProtectedRoute path="/debts" component={App} isPrivate={true}/>
        <Route path="*" component={E404}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

