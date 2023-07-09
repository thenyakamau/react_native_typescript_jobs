import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './popular.style';
import {COLORS, SIZES} from '@/constants';
import PopularJobsCard from '@components/common/cards/popular/popularJobsCards';
import useFetch from '@/hook/useFetch';
import {JobModel} from '@/models/jobModel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/App';

export default function PopularJobs() {
  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const {data, isLoading, error} = useFetch<JobModel[]>({
    query: 'React developer',
    page: '1',
    num_pages: '1',
    endPoint: 'search',
  });

  const [selectedItem, setSelectedItem] = useState<JobModel | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>

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
          <FlatList<JobModel>
            data={data ?? []}
            renderItem={({item}) => {
              return (
                <PopularJobsCard
                  item={item}
                  selected={selectedItem?.job_id === item.job_id}
                  handleCardPress={jItem => {
                    navigator.navigate('Details', {jobId: jItem.job_id});
                    setSelectedItem(item);
                  }}
                />
              );
            }}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          />
        )}
      </View>
    </View>
  );
}
