import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Vacina } from "../types/vacina";
import { listVacinas } from "../services/vacinaService";
import PetCard from "../components/petCard";

export default function DetalhesScreen() {

    const [vacinas, setVacinas] = useState<Vacina[]>([])

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

    useEffect(() => {
        carregarVacinas()
    })

    return (
        <View>
            {/* <FlatList
                data={vacinas}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={({ item }) => (
                    <PetCard
                        nome={item.nome}
                        raca={item.clinica}
                        observacoes={item.observacoes}
                        dataNascimento={item.dataAplicacao}
                        peso={2}
                        sexo={item.veterinario}
                    />
                )}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            /> */}
        </View>
    );
}