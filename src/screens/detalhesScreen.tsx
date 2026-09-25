import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Modal, Pressable, TextInput } from "react-native";
import { Vacina } from "../types/vacina";
import { listVacinas, salvarVacina } from "../services/vacinaService";
import { Pet } from "../types/pet";
import { getPetById } from "../services/petService";
import VacinaCard from "../components/vacinaCard";
import Icon from '@expo/vector-icons/Ionicons';
import { SexoSelector } from "../components/sexoButtonComponent";

export default function DetalhesScreen() {

    const [vacinas, setVacinas] = useState<Vacina[]>([])
    const [pet, setPet] = useState<Pet>()
    const [isModalVacinaVisible, setIsModalVacinaVisible] = useState(false)
    const [nomeVacina, setNomeVacina] = useState("")
    const [dataAplicacao, setDataAplicacao] = useState("")
    const [proximaDose, setProximaDose] = useState("")
    const [veterinario, setVeterinario] = useState("")
    const [clinica, setClinica] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const route = useRoute<any>();
    const petId = route.params.petId;

    async function adicionarVacina() {
        try {
            const novaVacina: Vacina = {
                idPet: petId,
                nome: nomeVacina,
                dataAplicacao: dataAplicacao,
                proximaDose: proximaDose,
                veterinario: veterinario,
                clinica: clinica,
                observacoes: observacoes
            }
            await salvarVacina(novaVacina)
            limparCampos()
        }
        catch (error) {
            console.log(error)
        }
    }

    function limparCampos() {
        setIsModalVacinaVisible(false)
        setNomeVacina("")
        setDataAplicacao("")
        setProximaDose("")
        setVeterinario("")
        setClinica("")
        setObservacoes("")
    }

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
            <View style={styles.carteirinha}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.avatarImage}
                            source={{ uri: pet?.imagem }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.nome}>{pet?.nome}</Text>
                        <Text style={styles.raca}>{pet?.raca}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeTexto}>{pet?.sexo}</Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.info}>
                    <View style={styles.linhaInfo}>
                        <Text style={styles.rotulo}>Nascimento</Text>
                        <Text style={styles.valor}>{pet?.dataNascimento || "-"}</Text>
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

                <View style={styles.footer}>
                    <Icon name="paw" size={18} color="#0F4D0F" />
                    <Text style={styles.footerTexto}>Carteirinha PetCare</Text>
                </View>
            </View>
            <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Vacinas</Text>
                <Icon name="add-circle" size={40} color="#0F4D0F" onPress={() => setIsModalVacinaVisible(true)} />
            </View>
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
                    contentContainerStyle={{ gap: 5 }}
                />
                :
                <Text style={{ textAlign: "center", fontSize: 16, color: "#666", flex: 1, alignContent: "center" }}>Nenhuma vacina encontrada</Text>
            }
            <Modal
                visible={isModalVacinaVisible}
                onRequestClose={() => setIsModalVacinaVisible(false)}
                animationType="slide"
            >
                <Pressable
                    style={{ margin: 10, alignSelf: "flex-start" }}
                    onPress={() => setIsModalVacinaVisible(false)}
                >
                    <Icon name="close" size={30} />
                </Pressable>
                <View style={{ flex: 1, padding: 20, gap: 20 }}>
                    <TextInput style={styles.input} placeholder="Nome da Vacina" placeholderTextColor={"grey"} value={nomeVacina} onChangeText={setNomeVacina} />
                    <TextInput style={styles.input} placeholder="Data de Aplicação" placeholderTextColor={"grey"} value={dataAplicacao} onChangeText={setDataAplicacao} />
                    <TextInput style={styles.input} placeholder="Proxima Dose" placeholderTextColor={"grey"} value={proximaDose} onChangeText={setProximaDose} />
                    <TextInput style={styles.input} placeholder="Veterinário" placeholderTextColor={"grey"} value={veterinario} onChangeText={setVeterinario} />
                    <TextInput style={styles.input} placeholder="Clínica" placeholderTextColor={"grey"} value={clinica} onChangeText={setClinica} />
                    <TextInput style={styles.input} placeholder="Observações" placeholderTextColor={"grey"} value={observacoes} onChangeText={setObservacoes} />
                    <Pressable
                        style={styles.botao}
                        onPress={() => adicionarVacina()}
                    ><Text style={styles.botaoLetra}>Adicionar</Text></Pressable>
                </View>
            </Modal>
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
    tituloContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    carteirinha: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 18,
        gap: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        overflow: "hidden",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
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
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#DDD",

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
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    info: {
        gap: 12,
    },
    linhaInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        borderStyle: "dashed",
    },
    footerTexto: {
        fontSize: 13,
        color: "#0F4D0F",
        fontWeight: "600",
    },
    botao: {
        backgroundColor: "green",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    botaoLetra: {
        color: "white",
        fontSize: 18
    },
});
