import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import useFetch from '@/hook/useFetch';
import {JobModel} from '@/models/jobModel';
import {COLORS, SIZES} from '@/constants';
import Company from '@components/job_details/company/company';
import JobTabs from '@components/job_details/tabs/jobTabs';
import JobFooter from '@components/job_details/footer/jobFooter';
import {RootStackParamList} from '@/App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const tabs = ['About', 'Qualifications', 'Benefits'];
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
export default function JobDetails({route}: Props) {
  const job_id = route.params.jobId;

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTabs, setActiveTabs] = useState<string>(tabs[0]);

  const {data, isLoading, error, refetch} = useFetch<JobModel[]>({
    job_id: job_id,
    endPoint: 'job-details',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch('1');
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : !data || data?.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
              <Company item={data[0]} />

              <JobTabs
                tabs={tabs}
                activeTab={activeTabs}
                setActiveTabs={setActiveTabs}
                item={data[0]}
              />
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data?.[0]?.job_google_link ??
            'https://careers.google.com/jobs/results/'
          }
        />
      </>
    </SafeAreaView>
  );
}
