import React from 'react';
import { Image, View } from 'react-native';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';

const AvatarGroup = () =>
{
  const imageStyle = {
    height: 32,
    width: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };
  const uidLength = 10;
  const imageUrl = 'https://img-9gag-fun.9cache.com/photo/anNxRq0_460s.jpg';
  return (
    <RowComponent styles={{ justifyContent: 'flex-start' }}>
      {Array.from( { length: uidLength } ).map(
        ( item, index ) =>
          index < 3 && (
            <Image
              source={{ uri: imageUrl }}
              key={index}
              style={{
                ...imageStyle,
                marginLeft: index > 0 ? -10 : 0,
              }}
            />
          ),
      )}
      {uidLength > 5 &&
        <View style={[ imageStyle,
          {
            marginLeft: -10,
            backgroundColor: 'coral',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          },

        ]}>
          <TextComponent
            flex={0}
            styles={{ lineHeight: 18 }}
            font={fontFamilies.bold}
            text={`+${ uidLength - 3 > 9 ? 9 : uidLength - 3 }`} />
        </View>}

    </RowComponent>
  );
};

export default AvatarGroup;
