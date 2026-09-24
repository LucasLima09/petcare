import { View, StyleSheet, Text } from "react-native";

type VacinaCardProps = {
    nome: string
    dataAplicacao: string
    proximaDose: string
    veterinario: string
    clinica: string
    observacoes?: string
}

export default function VacinaCard({ nome, dataAplicacao, proximaDose, veterinario, clinica, observacoes }: VacinaCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardNome}>{nome}</Text>
            <Text style={styles.cardInfo}>Data de Aplicação: {dataAplicacao}</Text>
            <Text style={styles.cardInfo}>Próxima Dose: {proximaDose}</Text>
            <Text style={styles.cardInfo}>Veterinário: {veterinario}</Text>
            <Text style={styles.cardInfo}>Clínica: {clinica}</Text>
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