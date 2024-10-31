import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import FinancialReportScreen from './screens/FinancialReportScreen';
import TransactionScreen from './screens/TransactionScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Transaction">
        <Stack.Screen 
          name="Transaction" 
          component={TransactionScreen} 
          options={{ title: 'Transactions' }}
        />
        <Stack.Screen 
          name="FinancialReport" 
          component={FinancialReportScreen} 
          options={{ title: 'Financial Report' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
