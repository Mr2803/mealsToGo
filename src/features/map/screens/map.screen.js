import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const RestaurantMap = ({ navigation }) => {
  // console.log(navigation);
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  //   console.log(restaurants);
  //   console.log(location);
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location;

  //   console.log(viewport);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("DettagliRistorante", {
                    restaurant: restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <SafeArea>
        <Map
          region={{
            latitude: 0,
            longitude: 0,
          }}
        />
      </SafeArea>
    );
  }
  return <RestaurantMap navigation={navigation} />;
};
