import { Button, Modal, TextInput, View } from "react-native";
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
                <View style={{ flex: 1, padding: 60 }}>
                    <TextInput placeholder="Nome do Pet" value={nomePet} onChangeText={setNomePet} />
                    <TextInput placeholder="Raça" value={raca} onChangeText={setRaca} />
                    <TextInput placeholder="Data de Nascimento" value={dataNascimento} onChangeText={setDataNascimento} />
                    <TextInput placeholder="Peso" value={peso} onChangeText={setPeso} />
                    <SexoSelector
                        value="Macho"
                        onChange={() => setSexo("Macho")}
                    />
                    <SexoSelector
                        value="Fêmea"
                        onChange={() => setSexo("Fêmea")}
                    />
                    <TextInput placeholder="Observação" value={observacao} onChangeText={setObservacao} />
                    <Button
                        title="Adicionar"
                        onPress={() => adicionarPet()}
                    />
                </View>
            </Modal>
        </View>
    );
}