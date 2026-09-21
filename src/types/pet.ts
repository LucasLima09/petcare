export interface Pet {
    id: string;
    idDono: string;
    nome: string;
    especie: string;
    raca: string;
    dataNascimento: string;
    peso: number;
    sexo: "Macho" | "Fêmea";
    observacoes: string;
    criadoEm: string;
}