import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { View, Button, useTheme, Image, Text, Heading, useAuthenticator } from '@aws-amplify/ui-react';

import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Route, useHistory } from 'react-router-dom';

import awsExports from './aws-exports';
import SideBar from './components/sidebar/index'
import TopNavBar from './components/default/TopNavBar';
import { Tabs, TabItem } from '@aws-amplify/ui-react';

import {
  ExpenseFormCreate
} from './ui-components';

import ExpenseTable from './components/expenses/ExpenseTable';
import Header from './components/header/index';
import Layout from './components/layout/Layout.tsx';
import ExpenseDetails from './pages/expenses/ExpenseDetails';
Amplify.configure(awsExports);



const App = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();


  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  return (
    <>
      <ExpenseDetails/>

    </>
  );
};

export default App;
