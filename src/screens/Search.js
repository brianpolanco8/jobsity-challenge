import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { api } from "../app/api";
import { SearchBar } from "../components";
import { BLACK, DARKGREEN, GRAY, WHITE } from "../utils/colors";
import debounce from "lodash.debounce";
import SearchResult from "../components/SearchResult";
import axios from "axios";
import { fetch } from "../utils/helpers";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearcQuery] = useState("");
  const [shows, setShows] = useState({});

  const onChange = (value) => setSearch(value);

  useEffect(() => {
    const { cancel } = axios.CancelToken.source();
    if (search.trim().length > 2) {
      const timeOutId = setTimeout(
        () => fetch(api.search.shows, setShows, search),
        500
      );
      return () => cancel("No more queries") || clearTimeout(timeOutId);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <SearchBar onChange={onChange} value={search} />

      {/* SearchResult FlatList */}
      <FlatList
        data={shows}
        keyExtractor={(item, i) => `${i}`}
        renderItem={({ item }) => <SearchResult item={item} />}
      />

      {/*  */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
});
