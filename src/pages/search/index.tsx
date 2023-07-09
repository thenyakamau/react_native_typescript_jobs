import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import useFetch from '@/hook/useFetch';
import {JobModel} from '@/models/jobModel';
import {COLORS, SIZES, icons} from '@/constants';
import styles from '@/styles/search';
import NearbyJobsCard from '@components/common/cards/nearby/nearbyJobsCard';
import {RootStackParamList} from '@/App';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;
export default function Search({route}: Props) {
  const {searchTerm} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Search'>>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {data, isLoading, error, refetch} = useFetch<JobModel[]>({
    query: searchTerm,
    page: '1',
    num_pages: '1',
    endPoint: 'search',
  });

  return (
    <SafeAreaView style={{backgroundColor: COLORS.lightWhite}}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList<JobModel>
          data={data ?? []}
          renderItem={({item}) => {
            return (
              <NearbyJobsCard
                item={item}
                handleCardPress={() => {
                  navigation.navigate('Details', {jobId: item.job_id});
                }}
              />
            );
          }}
          keyExtractor={item => item.job_id}
          contentContainerStyle={{columnGap: SIZES.small}}
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <Text style={styles.searchTitle}>{searchTerm}</Text>
                <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
              </View>
              <View style={styles.loaderContainer}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  error && <Text>Oops something went wrong</Text>
                )}
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  let prevPage = currentPage > 1 ? currentPage - 1 : 1;
                  setCurrentPage(prevPage);

                  refetch(prevPage.toString());
                }}>
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{currentPage}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  let nextPage = currentPage + 1;
                  setCurrentPage(nextPage);

                  refetch(nextPage.toString());
                }}>
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
