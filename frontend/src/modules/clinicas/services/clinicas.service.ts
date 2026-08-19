import { api } from "../../../api/api";
import type { Clinica } from "../../../types/clinica.types";

export async function getClinicas(): Promise<Clinica[]> {
    const { data } = await api.get("/clinicas");
    return data.data;
}
