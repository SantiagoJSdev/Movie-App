import React, { useRef } from 'react'
import { Animated, Button, View } from 'react-native'; 
import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {

   const {fadeIn, fadeOut, opacity} = useFade();
 
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Animated.View
                style={{
                    backgroundColor: 'black',
                    width: 150,
                    height: 150,
                    borderColor: 'white',
                    marginBottom: 20,
                    borderWidth: 5,
                    opacity: opacity
                }}>

            </Animated.View>
            <Button
            title='FadeIn'
            onPress = { fadeIn }
            />
            <Button
            title='FadeOut'
            onPress = { fadeOut }
            />
        </View>
    )
}
