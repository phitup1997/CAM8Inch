import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import DataRow from '../components/DataRow';
import {useGetPokemonByNameQuery} from '../services/api';

const PokemonDetailScreen = ({route}) => {
  const {data, isLoading} = useGetPokemonByNameQuery(
    route.params?.name || 'ivysaur',
  );

  console.log(`ccccc data : ${JSON.stringify(data?.abilities)}`);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  // <View>
  //     <View style={styles.infoCard}>
  //       <Text style={styles.description}>{data.description}</Text>

  //       <Text style={styles.sectionTitle}>Pokédex Data</Text>
  //       <DataRow label="Category" value={data.category} />
  //       <DataRow label="Height" value={`${data.height} m`} />
  //       <DataRow label="Weight" value={`${data.weight} kg`} />
  //       <DataRow label="Abilities" value={data.abilities} isVertical />

  //       <Text style={styles.sectionTitle}>Training</Text>
  //       <DataRow label="Catch Rate" value={data.training.catchRate} />
  //       <DataRow label="Base Happiness" value={data.training.happiness} />
  //       <DataRow label="Base Experience" value={data.baseExp} />
  //       <DataRow label="Growth Rate" value={data.training.growthRate} />
  //     </View>
  //   </View>
  // );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#78C850'}}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}>
        {/* Header Icons */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Text style={styles.iconText}>{data.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.heartIcon}>❤️</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View>
            <Text style={styles.pokemonId}>#001</Text>
            <Text style={styles.pokemonName}>Bulbasaur</Text>
            <View style={styles.typeRow}>
              <View style={[styles.typeBadge, {backgroundColor: '#9bcc50'}]}>
                <Text style={styles.typeText}>🍃 grass</Text>
              </View>
              <View style={[styles.typeBadge, {backgroundColor: '#b97fc9'}]}>
                <Text style={styles.typeText}>🔮 poison</Text>
              </View>
            </View>
          </View>

          {/* Main Image - Layered to overlap the white card */}
          {/* <Image
            source={{
              uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            }}
            style={styles.mainImage}
          /> */}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          {/* Custom Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={styles.activeTabText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Base Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Evolution</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            A strange seed was planted on its back at birth. The plant sprouts
            and grows with this POKéMON.
          </Text>

          {/* Data Section */}
          <Text style={styles.sectionTitle}>Pokédex Data</Text>
          <DataRow label="Category" value="Seed Pokémon" />
          <DataRow label="Height" value="0.7 m" />
          <DataRow label="Weight" value="6.9 kg" />
          <DataRow label="Abilities" value="overgrow, chlorophyll" isVertical />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    paddingHorizontal: 20,
    height: 250, // Fixed height to control overlap
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  mainImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    right: 10,
    bottom: -30, // Pushes the image into the white card area
    zIndex: 10,
  },
  infoCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    minHeight: 500,
    marginTop: -20, // Slight overlap for the curve
  },
  // ... other styles
});

export default PokemonDetailScreen;
