import { View, StyleSheet, Text } from "react-native";

type PetCardProps = {
    nome: string
    raca: string
    peso: number
    sexo: string
    dataNascimento: string
    observacoes?: string
}

export default function PetCard({ nome, raca, peso, sexo, dataNascimento, observacoes }: PetCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardNome}>{nome}</Text>
            <Text style={styles.cardInfo}>Raça: {raca}</Text>
            <Text style={styles.cardInfo}>Peso: {peso}kg</Text>
            <Text style={styles.cardInfo}>Sexo: {sexo}</Text>
            <Text style={styles.cardInfo}>Nascimento: {dataNascimento}</Text>
            {observacoes ? <Text style={styles.cardInfo}>Obs: {observacoes}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#DDD",
        gap: 4,
    },
    cardNome: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F4D0F",
    },
    cardInfo: {
        fontSize: 14,
        color: "#444",
    },
});