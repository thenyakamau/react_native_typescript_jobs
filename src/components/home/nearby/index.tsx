import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import styles from './nearby.style';
import useFetch from '@/hook/useFetch';
import {JobModel} from '@/models/jobModel';
import {COLORS} from '@/constants';
import NearbyJobsCard from '@components/common/cards/nearby/nearbyJobsCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/App';

export default function NearbyJobs() {
  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const {data, isLoading, error} = useFetch<JobModel[]>({
    query: 'React developer',
    page: '1',
    num_pages: '1',
    endPoint: 'search',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map(item => {
            return (
              <NearbyJobsCard
                item={item}
                handleCardPress={() => {
                  navigator.navigate('Details', {jobId: item.job_id});
                }}
                key={item.job_id}
              />
            );
          })
        )}
      </View>
    </View>
  );
}
