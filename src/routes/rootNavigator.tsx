import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./appNavigator";
import AuthNavigator from "./authNavigator";
import { useAuth } from "./authContext";
import { ActivityIndicator, View } from "react-native";

export default function Routes() {

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
