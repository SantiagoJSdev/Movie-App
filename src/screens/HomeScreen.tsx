
import React from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MoviePoster } from '../components/MoviePoster';

import Carousel from 'react-native-snap-carousel';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowsWidth } = Dimensions.get('window');

export const HomeScreen = () => {


    const { nowPlaying, isloading, popular, topRated, upComing } = useMovies();
    const { top } = useSafeAreaInsets();
    if (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }


    return (
        <ScrollView>
            <View style={{ marginTop: top + 20 }}>
                {/* <MoviePoster movie= {peliculasCine[2]}/> */}

                {/* carrusel principal */}
                <View
                    style={{
                        height: 440
                    }}
                >
                    <Carousel
                        data={nowPlaying}
                        renderItem={({ item }: any) => <MoviePoster movie={item} />}
                        sliderWidth={windowsWidth}
                        itemWidth={300}
                        inactiveSlideOpacity={0.9}
                    />
                </View>

                {/* peliculas populares */}
                <HorizontalSlider title='Popular' movies={popular} /> 
                <HorizontalSlider title='Top Rated' movies={topRated} /> 
                <HorizontalSlider title='Upcoming' movies={upComing} />


            </View>
        </ScrollView>
    )
}
