import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "./firebase"
import { Vacina } from "../types/vacina"

export async function listVacinas(idPet: string): Promise<Vacina[]> {

    if (!idPet || idPet === "") {
        throw "Erro ao buscar id do pet"
    }

    const ref = collection(db, "vacinas")
    const q = query(ref, where("idPet", "==", idPet))
    const querySnapshot = await getDocs(q)

    const vacinas: Vacina[] = []
    querySnapshot.forEach((doc) => {
        vacinas.push({ id: doc.id, ...doc.data() } as Vacina)
    })

    return vacinas
}