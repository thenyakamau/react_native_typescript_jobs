import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {COLORS, SIZES} from '@/constants';
import Welcome from '@components/home/welcome';
import PopularJobs from '@components/home/popular';
import NearbyJobs from '@components/home/nearby';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <SafeAreaView style={{backgroundColor: COLORS.lightWhite}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: SIZES.medium}}>
          <Welcome
            handleClck={(searchTerm: string) => {
              if (searchTerm) {
                navigation.navigate('Search', {searchTerm});
              }
            }}
          />
          <PopularJobs />
          <NearbyJobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
