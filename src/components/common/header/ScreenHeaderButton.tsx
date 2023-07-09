import React from 'react';
import {
  DimensionValue,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {SIZES} from '../../../constants';
import styles from './screenheader.style';

type Props = {
  iconUrl: ImageSourcePropType;
  dimension: DimensionValue;
  handlePress?: () => void;
};
export default function ScreenHeaderButton({
  iconUrl,
  dimension,
  handlePress,
}: Props) {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: SIZES.small / 1.25,
        }}
      />
    </TouchableOpacity>
  );
}
