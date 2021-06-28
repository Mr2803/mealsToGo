import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { CompactRestaurantInfo } from "../restaurant/compact-restaurant-info.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const FavouritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 999;
  border-radius: 15px;
`;

export const FavouriteBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouritesWrapper elevation={3}>
      <Spacer variant="left.large">
        <Text variant="caption">Preferiti</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          // console.log(restaurant);
          const key = restaurant.name.split(" ").join("");
          return (
            <Spacer position="left" size="medium" key={key}>
              <TouchableOpacity
                onPress={() =>
                  onNavigate("DettagliRistorante", {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
