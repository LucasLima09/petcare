import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export async function registerUser(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
    await signOut(auth);
}