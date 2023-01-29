import React from 'react'
import { View, Text, FlatList } from 'react-native';
import currencyFormatter from 'currency-formatter';

import { Cast } from '../interface/creditsInterface';
import { MovieFull } from '../interface/movieInterface';
import Icon from "react-native-vector-icons/Ionicons";
import { CastItem } from './CastItem';

interface Props {
  movieFull?: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name='star-outline'
            color='grey'
            size={20}
          />
          <Text style={{color: 'black'}}>{movieFull?.vote_average}</Text>
          <Text style={{ marginLeft: 10, color: 'black' }}>
            - {movieFull?.genres.map(g => g.name).join(',  ')}
          </Text>
        </View>
        {/* historia */}
        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold', color: 'black' }}>
          Historia
        </Text>
        <Text style={{ fontSize: 16, color: 'black' }}>
          {movieFull?.overview}
        </Text>
        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold', color: 'black' }}>
          Presupuesto
        </Text>
        <Text style={{ fontSize: 18, color: 'black' }}>
          {currencyFormatter.format(movieFull?.budget!, { code: 'USD' })}
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 100, }}>
        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20, color: 'black' }}>
          Actores
        </Text>
        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 70, }}
        />
        {/*  */}

      </View>


    </>
  )
}
