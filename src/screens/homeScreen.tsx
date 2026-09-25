import { FlatList, Modal, TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import { useEffect, useState } from "react";
import { Pet } from "../types/pet";
import { addPet, listPets } from "../services/petService";
import { SexoSelector } from "../components/sexoButtonComponent";
import PetCard from "../components/petCard";
import { useNavigation } from "@react-navigation/native";
import Icon from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [nomePet, setNomePet] = useState("")
    const [raca, setRaca] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [peso, setPeso] = useState("")
    const [sexo, setSexo] = useState<'Macho' | 'Fêmea'>("Macho")
    const [observacao, setObservacao] = useState("")
    const [pets, setPets] = useState<Pet[]>([])
    const [imagem, setImagem] = useState("")
    const navigation = useNavigation<any>()

    useEffect(() => {
        carregarPets()
    }, [])

    async function carregarPets() {
        try {
            const lista = await listPets()
            setPets(lista)
        } catch (erro) {
            console.log(erro)
        }
    }

    function limparCampos() {
        setNomePet("")
        setRaca("")
        setDataNascimento("")
        setPeso("")
        setImagem("")
        // setSexo("")
        setObservacao("")
    }

    function adicionarPet() {
        try {
            const novoPet: Pet = {
                nome: nomePet,
                raca: raca,
                dataNascimento: dataNascimento,
                peso: Number(peso),
                sexo: sexo,
                observacoes: observacao,
                imagem: imagem,
            }

            addPet(novoPet).then(carregarPets);
            limparCampos()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={styles.container}>
            {pets.length > 0 ?
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id ?? ""}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate('Detalhes', { petId: item.id })}
                        >
                            <PetCard
                                nome={item.nome}
                                raca={item.raca}
                                observacoes={item.observacoes}
                                dataNascimento={item.dataNascimento}
                                peso={item.peso}
                                sexo={item.sexo}
                                imagem={item.imagem}
                            />
                        </Pressable>

                    )}
                    contentContainerStyle={{ gap: 10 }}
                />
                :
                <Text style={{ textAlign: "center", fontSize: 16, color: "#666", flex: 1, justifyContent: "center", alignContent: "center" }}>Nenhum pet encontrado</Text>
            }

            <Pressable
                style={styles.botao}
                onPress={() => setIsModalVisible(true)}>
                <Text style={styles.botaoLetra}>Adicionar Pet</Text>
            </Pressable>

            <Modal
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType="slide"
            >
                <Pressable
                    style={{ margin: 10, alignSelf: "flex-start" }}
                    onPress={() => setIsModalVisible(false)}
                >
                    <Icon name="close" size={30} />
                </Pressable>
                <View style={{ flex: 1, padding: 20, gap: 20 }}>
                    <TextInput style={styles.input} placeholder="Nome do Pet" placeholderTextColor={"grey"} value={nomePet} onChangeText={setNomePet} />
                    <TextInput style={styles.input} placeholder="Raça" placeholderTextColor={"grey"} value={raca} onChangeText={setRaca} />
                    <TextInput style={styles.input} placeholder="Data de Nascimento" placeholderTextColor={"grey"} value={dataNascimento} onChangeText={setDataNascimento} />
                    <TextInput style={styles.input} placeholder="Peso" placeholderTextColor={"grey"} value={peso} onChangeText={setPeso} />
                    <View style={{ flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "center" }}>
                        <SexoSelector
                            value="Macho"
                            onChange={() => setSexo("Macho")}
                        />
                        <SexoSelector
                            value="Fêmea"
                            onChange={() => setSexo("Fêmea")}
                        />
                    </View>
                    <TextInput style={styles.input} placeholder="Observação" placeholderTextColor={"grey"} value={observacao} onChangeText={setObservacao} />
                    <TextInput style={styles.input} placeholder="Imagem" placeholderTextColor={"grey"} value={imagem} onChangeText={setImagem} />
                    <Pressable
                        style={styles.botao}
                        onPress={() => adicionarPet()}
                    ><Text style={styles.botaoLetra}>Adicionar</Text></Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
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
        backgroundColor: "green",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    botaoSair: {
        margin: 10,
        backgroundColor: "red",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    botaoLetra: {
        color: "white",
        fontSize: 18
    },
});