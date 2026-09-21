import { Pressable, View, StyleSheet } from "react-native";

type Variante = "preenchido" | "vazado"

type BotaoComponentProps = {
    titulo: string
    variante: Variante
    onPress: () => void
}

export default function BotaoComponent({ titulo, variante, onPress }: BotaoComponentProps) {
    return (
        <View>
            <Pressable onPress={() => { onPress() }} style={[styles.botao, styles.botaoLogin]}><Text style={styles.botaoLetra}>{titulo}</Text></Pressable>
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
    },
});