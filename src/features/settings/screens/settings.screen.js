import React, { useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthContext } from "../../../services/auth/auth.context";

const SettingBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const getProfilePic = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };
  // useFocusEffect(() => {
  //   getProfilePic(user);
  // }, [user]);
  useFocusEffect(
    useCallback(() => {
      getProfilePic(user);
    }, [user])
  );
  return (
    <SettingBackground>
      <SafeArea>
        <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            {!photo && (
              <Avatar.Icon
                size={160}
                icon="human"
                backgroundColor={colors.brand.primary}
              />
            )}
            {photo && (
              <Avatar.Image
                size={160}
                source={{ uri: photo }}
                backgroundColor="#2182bd"
              />
            )}
          </TouchableOpacity>
          <Spacer position="top" size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <SettingsItem
            title="Preferiti"
            description="Guarda i tuoi ristoranti preferiti"
            left={(props) => (
              <List.Icon {...props} color={colors.ui.error} icon="heart" />
            )}
            onPress={() => navigation.navigate("Preferiti")}
          />
          <Spacer />
          <SettingsItem
            style={{ padding: 16 }}
            title="Pagamenti"
            left={(props) => <List.Icon {...props} color="black" icon="cart" />}
            onPress={() => null}
          />
          <Spacer />
          <SettingsItem
            style={{ padding: 16 }}
            title="I tuoi ordini"
            left={(props) => (
              <List.Icon {...props} color="black" icon="history" />
            )}
            onPress={() => null}
          />
          <Spacer />
          <SettingsItem
            style={{ padding: 16 }}
            title="Logout"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            onPress={onLogout}
          />
        </List.Section>
      </SafeArea>
    </SettingBackground>
  );
};
