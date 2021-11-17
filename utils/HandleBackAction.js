import { BackHandler, Alert } from 'react-native'

const HandleBackAction = () =>{
        const backAction = () => {
          Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        return () => backHandler.remove();
}
export default HandleBackAction;