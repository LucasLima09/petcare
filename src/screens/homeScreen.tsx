import { Button, View } from "react-native";
import { logoutUser } from "../services/authService";

export default function HomeScreen() {
    return (
        <View>
            HomeScreen
            <Button
                title="Sair"
                onPress={() => logoutUser()}
            />
        </View>
    );
}