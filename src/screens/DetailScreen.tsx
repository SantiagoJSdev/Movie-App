
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Movie } from '../interface/movieInterface';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from "react-native-vector-icons/Ionicons";


const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`

    const { isLoading, movieFull, cast } = useMovieDetails(movie.id)


    return (

        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.posterImage}
                    />
                </View>

            </View>

            <View style={styles.marginConteiner}>
                <Text style={styles.subTitle}>{movie?.original_title}</Text>
                <Text style={styles.title}>{movie?.title}</Text>
            </View>
            {
                isLoading
                    ? <ActivityIndicator size={35} color='grey' style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={movieFull!} cast={cast} />
            }
            <TouchableOpacity
                style={styles.backButton}
                onPress={()=> navigation.goBack()}
            >
                <Icon
                    color='white'
                    name='arrow-back-outline'
                    size={60}
                />

            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        // paddingBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,
        elevation: 10,

        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage: {
        flex: 1
    },
    marginConteiner: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
        color: 'black'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5

    }

});