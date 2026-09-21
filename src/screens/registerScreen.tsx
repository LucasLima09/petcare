import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { registerUser } from "../services/authService";

type LoginScreenProps = {
    navigation: any
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            await registerUser(email, password);
            limparCampos()
        } catch {
            throw "Erro ao criar conta"
        }
    }

    function limparCampos() {
        setEmail("")
        setPassword("")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo1}>Pet<Text style={styles.logo2}>Care</Text></Text>
                <Text style={styles.frase}>Organização do seu amigo em um lugar só</Text>
            </View>
            <View style={styles.body}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} />
                <Pressable onPress={() => { handleRegister() }} style={styles.botao}><Text style={styles.botaoLetra}>Cadastrar</Text></Pressable>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text>Já possui uma conta?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    ><Text style={{ color: "#3C3CE8" }}>Entrar</Text></Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#070738",

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
        color: "#4CAF50"
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
        backgroundColor: "#070738",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    botaoLetra: {
        color: "white",
        fontSize: 18

    }
});