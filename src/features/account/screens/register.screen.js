import React, { useContext, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  ImageBg,
  AccountCover,
  AccountContainer,
  AuthInput,
  AuthButton,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthContext } from "../../../services/auth/auth.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, error, isLoading } = useContext(AuthContext);
  return (
    <ImageBg>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          textContentType="emailAddress"
          value={email}
          autoCapitalize="none"
          onChangeText={(em) => setEmail(em)}
          keyboardType="email-address"
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={(psw) => setPassword(psw)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Conferma Password"
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            value={repeatedPassword}
            onChangeText={(rpsw) => setRepeatedPassword(rpsw)}
          />
        </Spacer>
        <Spacer size="large">
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Registrati
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.orange300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Indietro
        </AuthButton>
      </Spacer>
    </ImageBg>
  );
};
