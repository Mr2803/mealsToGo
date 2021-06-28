import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

const WrapperEmptyList = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
export const FavouritesScreen = ({ navigation }) => {
  // console.log(navigation);
  const { favourites } = useContext(FavouritesContext);
  // console.log(favourites);
  return favourites.length ? (
    <RestaurantList
      data={favourites}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DettagliRistorante", {
                restaurant: item,
              })
            }
          >
            <RestaurantInfoCard restaurant={item} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.name}
    />
  ) : (
    <WrapperEmptyList>
      <Text>Nessun Ristorante Aggiunto alla lista dei preferiti</Text>
    </WrapperEmptyList>
  );
};
