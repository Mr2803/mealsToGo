import React, { useContext, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { LocationContext } from "../../../services/location/location.context";
import { FavouriteBar } from "../../../components/favourites/favourite-bar.component";
import { Search } from "../components/search.component";
import { RestaurantList } from "../components/restaurant-list.styles";

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const RestaurantScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const { favourites } = useContext(FavouritesContext);
  // console.log(navigation);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading animating={true} size="large" color={Colors.orange800} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouriteBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {hasError && <Text variant="error">Qualcosa è andato storto !</Text>}
      {!hasError && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DettagliRistorante", {
                    restaurant: item,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
