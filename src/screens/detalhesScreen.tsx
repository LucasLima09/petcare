import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Vacina } from "../types/vacina";
import { listVacinas } from "../services/vacinaService";
import { Pet } from "../types/pet";
import { getPetById } from "../services/petService";
import VacinaCard from "../components/vacinaCard";

export default function DetalhesScreen() {

    const [vacinas, setVacinas] = useState<Vacina[]>([])
    const [pet, setPet] = useState<Pet>()

    const route = useRoute<any>();
    const petId = route.params.petId;

    async function carregarVacinas() {
        try {
            const lista = await listVacinas(petId);
            setVacinas(lista)
        } catch (error) {
            console.log(error)
        }
    }

    async function buscarPet() {
        try {
            const petEncontrado = await getPetById(petId)
            setPet(petEncontrado)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        carregarVacinas()
        buscarPet()
    })

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.nome}>{pet?.nome}</Text>
                        <Text style={styles.raca}>{pet?.raca}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeTexto}>{pet?.sexo}</Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.linhaInfo}>
                    <Text style={styles.rotulo}>Data de Nascimento</Text>
                    <Text style={styles.valor}>{pet?.dataNascimento}</Text>
                </View>

                <View style={styles.linhaInfo}>
                    <Text style={styles.rotulo}>Peso</Text>
                    <Text style={styles.valor}>{pet?.peso}kg</Text>
                </View>

                <View style={styles.linhaInfo}>
                    <Text style={styles.rotulo}>Observações</Text>
                    <Text style={styles.valor}>{pet?.observacoes || "-"}</Text>
                </View>
            </View>
            <Text style={styles.titulo}>Vacinas</Text>
            {vacinas.length > 0 ?
                <FlatList
                    data={vacinas}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) =>
                        <VacinaCard
                            nome={item.nome}
                            dataAplicacao={item.dataAplicacao}
                            proximaDose={item.proximaDose}
                            veterinario={item.veterinario}
                            clinica={item.clinica}
                            observacoes={item.observacoes}
                        />}
                />
                :
                <Text style={{ textAlign: "center", fontSize: 16, color: "#666", flex: 1, alignContent: "center" }}>Nenhuma vacina encontrada</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
        backgroundColor: "#F5F5F5",
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F4D0F",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 16,
        gap: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#0F4D0F",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarTexto: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    nome: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0F4D0F",
    },
    raca: {
        fontSize: 14,
        color: "#666",
    },
    badge: {
        backgroundColor: "#E8F5E8",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    badgeTexto: {
        color: "#0F4D0F",
        fontSize: 13,
        fontWeight: "bold",
    },
    divisor: {
        height: 1,
        backgroundColor: "#EEE",
    },
    linhaInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    rotulo: {
        fontSize: 14,
        color: "#666",
    },
    valor: {
        fontSize: 14,
        color: "#222",
        fontWeight: "600",
        flexShrink: 1,
        textAlign: "right",
    },
});
