import { View, StyleSheet, Text, Image } from "react-native";

type PetCardProps = {
    nome: string
    raca: string
    peso: number
    sexo: string
    dataNascimento: string
    observacoes?: string
    imagem?: string
}

export default function PetCard({ nome, raca, peso, sexo, dataNascimento, observacoes, imagem }: PetCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.containerInfo}>
                <Text style={styles.cardNome}>{nome}</Text>
                <Text style={styles.cardInfo}>Raça: {raca}</Text>
                <Text style={styles.cardInfo}>Peso: {peso}kg</Text>
                <Text style={styles.cardInfo}>Sexo: {sexo}</Text>
                <Text style={styles.cardInfo}>Nascimento: {dataNascimento}</Text>
                {observacoes ? <Text style={styles.cardInfo}>Obs: {observacoes}</Text> : null}
            </View>
            <View style={styles.containerImagem}>
                <Image style={styles.imagem} source={{ uri: imagem }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDD",
        gap: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    cardNome: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F4D0F",
    },
    containerInfo: {
        gap: 4,
        padding: 16,
    },
    containerImagem: {
        width: "35%",
        height: "100%",
        borderRadius: 12,
    },
    imagem: {
        width: "100%",
        height: "100%",
    },
    cardInfo: {
        fontSize: 14,
        color: "#444",
    },
});