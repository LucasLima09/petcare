import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./appNavigator";
import LoginScreen from "../screens/loginScreen";
import AuthNavigator from "./authNavigator";

export default function Routes() {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
}