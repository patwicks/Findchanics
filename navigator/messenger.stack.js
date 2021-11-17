import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MessengerTabScreen from "../screen/main/messenger/tab.messenger.screen";
import Message from "../screen/main/messenger/component.message.screen";
import StoreList from "../screen/main/messenger/component.store.list.screen";
// Navigator Variable
const Stack = createNativeStackNavigator();

export default function MessengerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Conversation" component={MessengerTabScreen} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Stores" component={StoreList} />
    </Stack.Navigator>
  );
}
