import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { loginUser } from "../services/authService";

type LoginScreenProps = {
    navigation: any
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        await loginUser(email, password);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo1}>Pet<Text style={styles.logo2}>Care</Text></Text>
                <Text style={styles.frase}>Carteira de vacinação digital</Text>
            </View>
            <View style={styles.body}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} />
                <Pressable onPress={() => { handleLogin() }} style={[styles.botao, styles.botaoLogin]}><Text style={styles.botaoLetra}>Login</Text></Pressable>
                <Text>ou</Text>
                <Pressable
                    onPress={() => navigation.navigate("Register")}
                    style={[styles.botao, styles.botaoRegister]}
                ><Text style={styles.botaoLetra}>Criar conta</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F4D0F",

    },
    header: {
        paddingHorizontal: 25,
        paddingTop: 80,
        paddingBottom: 40,
        gap: 10,
    },
    body: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 25,
        paddingTop: 40,
        gap: 16,
    },
    frase: {
        fontSize: 16,
        color: "#E0E0E0",
        maxWidth: "80%",
        lineHeight: 22,
    },
    logo1: {
        fontSize: 42,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    logo2: {
        color: "#5CE65C"
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    botao: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    botaoLogin: {
        backgroundColor: "#0F4D0F",
    },
    botaoRegister: {
        borderColor: "#0F4D0F",
        borderWidth: 2,
    },
    botaoLetra: {
        color: "white",
        fontSize: 18
    }
});