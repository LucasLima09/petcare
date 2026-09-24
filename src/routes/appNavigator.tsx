import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetalhesScreen from "../screens/detalhesScreen";
import { Pressable } from "react-native";
import { logoutUser } from "../services/authService";
import Icon from "@expo/vector-icons/Ionicons";

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
        <Stack.Navigator>
            <Stack.Screen name="Abas" component={Abas} options={{
                title: "Meus Pets", headerRight: () => (
                    <Pressable
                        style={{ justifyContent: "center", alignItems: "center", width: 50, height: 50 }}
                        onPress={() => logoutUser()}
                    >
                        <Icon name="exit-outline" size={30} color="black" />
                    </Pressable>
                )
            }} />
            <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        </Stack.Navigator>
    );
}