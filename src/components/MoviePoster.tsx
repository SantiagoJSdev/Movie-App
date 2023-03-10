import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'

import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { Movie } from '../interface/movieInterface';
import { RootStackParams } from '../navigation/Navigation';

interface Props {
    movie: Movie,
    height?: number;
    width?: number;
}
type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>

export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const navigation = useNavigation<HomeScreenNavigationProp>();
 // const navigation = useNavigation<StackScreenProps<any,any>>();
    return (
        <TouchableOpacity 
        // onPress={ () => navigation.navigate('DetailScreen' as never, movie as never) }
        onPress = {() => navigation.navigate('DetailScreen', movie) }
        activeOpacity={0.8}
        style={{
            width, 
            height,
            marginHorizontal: 2,
            paddingBottom: 20,
            paddingHorizontal: 7 
        }}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri
                    }}
                    style={styles.image}
                />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,

    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,
        elevation: 10,
    }
});