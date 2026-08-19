import { getClinicas } from "./clinicas.repository";

export async function getClinicasService() {
    return await getClinicas();
}
