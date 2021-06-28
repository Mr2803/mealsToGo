import React, { useState, useEffect, useRef, useContext } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../../../components/typography/text.component";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../../services/auth/auth.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 10px;
  width: 100%;
  justify-content: space-around;
`;

export const CameraScreen = ({ navigation }) => {
  console.log(navigation);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef();
  const { user } = useContext(AuthContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.cancelled) {
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <ProfileCamera
        ref={(cam) => (cameraRef.current = cam)}
        ratio={"16:9"}
        type={type}
      >
        <TouchableOpacity onPress={snap}></TouchableOpacity>
      </ProfileCamera>
      <ButtonContainer>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialIcons name="flip-camera-android" size={58} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={snap}>
          <MaterialIcons name="photo-camera" size={58} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <MaterialIcons name="camera-roll" size={58} color="white" />
        </TouchableOpacity>
      </ButtonContainer>
    </>
  );
};
