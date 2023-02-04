
import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MoviePoster } from '../components/MoviePoster'; 

import Carousel from 'react-native-snap-carousel';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColor } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const { width: windowsWidth } = Dimensions.get('window');

export const HomeScreen = () => {


    const { nowPlaying, isloading, popular, topRated, upComing } = useMovies();
    const { top } = useSafeAreaInsets();
    const {setMainColors, colors} = useContext(GradientContext);

    const getPosterColor = async (index: number) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${ movie?.poster_path }`
        
        const [primary = 'green', secondary = 'blue'] = await getImageColor(uri);  
        console.log({primary, secondary});
        setMainColors({primary, secondary})
    }
    
    useEffect(() => {
      if (nowPlaying.length > 0) {
        getPosterColor(0)
      }
    }, [nowPlaying])
    

    if (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }

 
    console.log(colors);
    
    return (
        <GradientBackground>
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
                            onSnapToItem={index => getPosterColor(index)}
                        />
                    </View>

                    {/* peliculas populares */}
                    <HorizontalSlider title='Popular' movies={popular} />
                    <HorizontalSlider title='Top Rated' movies={topRated} />
                    <HorizontalSlider title='Upcoming' movies={upComing} />


                </View>
            </ScrollView>
        </GradientBackground>
    )
}
