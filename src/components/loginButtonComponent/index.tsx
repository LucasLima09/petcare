import { Pressable, View, StyleSheet, Text } from "react-native";

type BotaoComponentProps = {
    titulo: string
    apenasBorda: boolean
    onPress: () => void
}

export default function LoginButton({ titulo, apenasBorda, onPress }: BotaoComponentProps) {
    return (
        <View>
            <Pressable onPress={() => { onPress() }} style={[styles.botao, apenasBorda ? styles.botaoVazado : styles.botaoPreenchido]}>
                <Text style={apenasBorda ? styles.textoVazado : styles.botaoLetra}>{titulo}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    botao: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    botaoPreenchido: {
        backgroundColor: "#0F4D0F",
    },
    botaoVazado: {
        borderColor: "#0F4D0F",
        borderWidth: 2,
    },
    botaoLetra: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    textoVazado: {
        color: "#0F4D0F",
        fontSize: 18,
        fontWeight: "bold",
    },
});