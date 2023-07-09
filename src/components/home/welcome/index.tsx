import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONT, icons, SIZES} from '../../../constants';
import styles from './welcome.style';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/App';

type WelcomeProps = {
  handleClck: (searchTerm: string) => void;
};
export default function Welcome({handleClck}: WelcomeProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const [search, setSearch] = useState<string>('');
  const jobTypes = ['Full-time', 'Part-time', 'Contractor'];

  const [activeJobType, setActiveJobType] = useState<string>('Full-time');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Welcome James</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={value => {
              setSearch(value);
            }}
            placeholder="What are you looking for"
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            handleClck(search);
          }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                ...styles.tab,
                borderColor:
                  activeJobType === item ? COLORS.secondary : COLORS.gray2,
              }}
              onPress={() => {
                setActiveJobType(item);
                handleClck(item);
              }}>
              <Text
                style={{
                  fontFamily: FONT.medium,
                  color:
                    activeJobType === item ? COLORS.secondary : COLORS.gray2,
                }}
                onPress={() => {
                  setActiveJobType(item);
                  navigation.push('Search', {searchTerm: item});
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          horizontal
          contentContainerStyle={{columnGap: SIZES.small}}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
