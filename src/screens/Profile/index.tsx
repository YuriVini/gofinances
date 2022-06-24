import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        value="Yuri"
        autoCorrect={false}
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Vinicius"
        autoCorrect={false}
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
