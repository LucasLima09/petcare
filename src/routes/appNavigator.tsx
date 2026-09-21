import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import DetalhesScreen from "../screens/detalhesScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Detalhes"
                component={DetalhesScreen}
            />
        </Tab.Navigator >
    );
}