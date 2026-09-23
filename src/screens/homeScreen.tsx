import { Button, Modal, TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import { logoutUser } from "../services/authService";
import { useState } from "react";
import { Pet } from "../types/pet";
import { addPet } from "../services/petService";
import { SexoSelector } from "../components/sexoButtonComponent";

export default function HomeScreen() {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [nomePet, setNomePet] = useState("")
    const [raca, setRaca] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [peso, setPeso] = useState("")
    const [sexo, setSexo] = useState<'Macho' | 'Fêmea'>("Macho")
    const [observacao, setObservacao] = useState("")

    console.log(sexo)
    function adicionarPet() {
        const novoPet: Pet = {
            nome: nomePet,
            raca: raca,
            dataNascimento: dataNascimento,
            peso: Number(peso),
            sexo: sexo,
            observacoes: observacao,
        }

        addPet(novoPet);
    }

    return (
        <View>
            <Button
                title="Sair"
                onPress={() => logoutUser()}
            />
            <Button
                title="Adicionar Pet"
                onPress={() => setIsModalVisible(true)}
            />

            <Modal
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType="slide"
            >
                <View style={{ flex: 1, padding: 30, gap: 20 }}>
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
        backgroundColor: "#0F4D0F",
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
        marginTop: 10,
    },
    botaoLetra: {
        color: "white",
        fontSize: 18
    }
});