import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  width: 100%;
  top: 45px;
  z-index: 9999;
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Ricerca un luogo"
        icon="map"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
