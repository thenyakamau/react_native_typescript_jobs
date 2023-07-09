import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {COLORS, icons, images} from '@/constants';

import ScreenHeaderButton from '@components/common/header/ScreenHeaderButton';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@/pages';
import Search from '@/pages/search';
import JobDetails from './pages/job_details';

export type RootStackParamList = {
  Home: undefined;
  Search: {searchTerm: string};
  Details: {jobId: string};
};

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderButton iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
              <ScreenHeaderButton iconUrl={images.profile} dimension="60%" />
            ),
            headerTitle: 'Home',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({navigation}) => ({
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitle: 'Search',
            headerLeft: () => (
              <ScreenHeaderButton
                iconUrl={icons.chevronLeft}
                dimension="60%"
                handlePress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Details"
          component={JobDetails}
          options={({navigation}) => ({
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderButton
                iconUrl={icons.chevronLeft}
                dimension="60%"
                handlePress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderButton iconUrl={icons.share} dimension="60%" />
            ),
            headerTitle: 'Job Detail',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
