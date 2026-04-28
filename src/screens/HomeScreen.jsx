import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PokemonList from '../components/PokemonList';
import React, {useCallback, useEffect, useState} from 'react';
import {useLazyGetPokemonByNameQuery} from '../services/api';
import PokemonItem from '../components/PokemonItem';
import useDebounce from '../hooks/useDebounce';
import Modal from '../components/compound/Modal';

const HomeScreen = () => {
  const [getPokemonByName, {data, isLoading}] = useLazyGetPokemonByNameQuery();
  const [isSearching, setIsSearching] = useState(false);
  const [searchPokemon, setSearchPokemon] = useState();
  const debouncedSearch = useDebounce(searchPokemon, 500);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      getPokemonByName(debouncedSearch);
    }
    setIsSearching(false);
  }, [debouncedSearch, getPokemonByName]);

  const handleSearch = useCallback(text => {
    setIsSearching(true);
    setSearchPokemon(text);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size={'large'} />;
    }
    if (debouncedSearch && data) {
      return (
        <View style={styles.itemCard}>
          <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
            <Text>Open Modal</Text>
          </TouchableOpacity>
          <PokemonItem name={data.name} />
        </View>
      );
    }
    return <PokemonList />;
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.content}>
        <TextInput
          placeholder="Search Pokemon"
          style={styles.inputWidth}
          onChangeText={handleSearch}
        />
        {isSearching && (
          <ActivityIndicator size={'small'} style={styles.marginRight} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokedex</Text>
      {renderSearchBar()}
      {renderContent()}
      <Modal visible={openModal} onRequestClose={() => setOpenModal(false)}>
        <Modal.Text />
        <Modal.CloseButton onPress={() => setOpenModal(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  header: {fontSize: 32, fontWeight: 'bold', padding: 20, color: '#333'},
  list: {paddingHorizontal: 20},
  content: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 6,
  },
  name: {fontSize: 18, fontWeight: '600', color: '#444'},
  arrow: {color: '#888', fontSize: 18},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  inputWidth: {width: '90%'},
  marginRight: {marginRight: 6},
  itemCard: {height: 150, paddingHorizontal: 20},
});

export default HomeScreen;
