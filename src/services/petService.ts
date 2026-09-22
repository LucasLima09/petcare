import { addDoc, collection } from "firebase/firestore";
import { Pet } from "../types/pet";
import { auth, db } from "./firebase";


export async function addPet(pet: Pet) {

    const idDono = auth.currentUser?.uid
    const criadoEm = new Date().toISOString()

    if (!idDono || String(idDono) === "") {
        throw "Erro ao buscar id do usuário"
    }

    await addDoc(collection(db, "pets"), { ...pet, idDono, criadoEm })

}