import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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

export async function listPets(): Promise<Pet[]> {
    const idDono = auth.currentUser?.uid

    if (!idDono || String(idDono) === "") {
        throw "Erro ao buscar id do usuário"
    }

    const ref = collection(db, "pets")
    const q = query(ref, where("idDono", "==", idDono))
    const querySnapshot = await getDocs(q)

    const pets: Pet[] = []
    querySnapshot.forEach((doc) => {
        pets.push({ id: doc.id, ...doc.data() } as Pet)
    })

    return pets
}