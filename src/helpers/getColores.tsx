import React from 'react'
import ImageColors from 'react-native-image-colors';
import { GradientBackground } from '../components/GradientBackground';

export const getImageColor = async (uri: string) => {
  
    const colors = await ImageColors.getColors(uri, {
        fallback: '#228B22',
        cache: false,
        key: 'unique_key',
      })

      let primary;
      let secondary;

      switch (colors.platform) {
        case 'android':
            primary = colors.dominant;
            secondary = colors.average
            break
        
        case 'ios':
            primary = colors.primary;
            secondary = colors.secondary;
            break
            default:
            throw new Error('Unexpected platform key')
    }
      return [primary, secondary]

}