import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetalhesScreen from "../screens/detalhesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Abas() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Abas" component={Abas} />
            <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        </Stack.Navigator>
    );
}