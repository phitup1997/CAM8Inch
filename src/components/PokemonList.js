import React, {useCallback} from 'react';
import {useGetPokemonListQuery} from '../services/api';
import PokemonItem from './PokemonItem';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import {navigate} from '../navigation/NavigationService';
import RouteKey from '../navigation/RouteKey';

const PokemonList = () => {
  const {data, isLoading, error} = useGetPokemonListQuery();

  const handlePress = useCallback(item => {
    navigate(RouteKey.PokemonDetailScreen, {name: item.name});
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return <PokemonItem name={item.name} onPress={() => handlePress(item)} />;
    },
    [handlePress],
  );

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data?.results}
      keyExtractor={item => item.name}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {paddingHorizontal: 20},
});

export default PokemonList;
