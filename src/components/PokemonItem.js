import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetPokemonByNameQuery} from '../services/api';

const typeColors = {
  grass: '#48d0b0',
  fire: '#fb6c6c',
  water: '#76bdfa',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#FFD86F',
  fairy: '#EE99AC',
};

const PokemonItem = ({name, onPress}) => {
  const {data, isLoading} = useGetPokemonByNameQuery(name);
  const [fadeAnim] = useState(new Animated.Value(0));

  const imageUrl = data?.sprites?.other?.['official-artwork']?.front_default;
  const mainType = data?.types[0]?.type?.name;
  const backgroundColor = typeColors[mainType] || '#DEDEDE';

  useEffect(() => {
    if (imageUrl) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, imageUrl]);

  if (isLoading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator color="#555" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Animated.View
        style={[styles.card, {backgroundColor, opacity: fadeAnim}]}>
        <View style={styles.cardContent}>
          <Text style={styles.pokeIndex}>{`#${data?.id
            .toString()
            .padStart(3, '0')}`}</Text>
          <Text style={styles.name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>

          <View style={styles.typesRow}>
            {data?.types.map(t => (
              <View key={t.type.name} style={styles.typeTag}>
                <Text style={styles.typeText}>{t.type.name.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        <Image
          source={{uri: imageUrl}}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFF00',
    // Advanced Shadows: Lighter on iOS, elevation on Android
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  loadingCard: {
    height: 120, // Pre-calculate height for layout stability
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
  },
  cardContent: {
    flex: 1,
    zIndex: 1, // Keep text above the image background overlap
  },
  pokeIndex: {
    fontSize: 14,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  typesRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  typeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'white',
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -5,
    bottom: -10,
  },
});

export default React.memo(PokemonItem);
