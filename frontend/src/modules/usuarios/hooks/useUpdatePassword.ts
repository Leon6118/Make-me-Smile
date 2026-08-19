import { updatePassword } from "../services/usuarios.service";

export function useUpdatePassword() {
    async function changePassword(data: any) {
        return await updatePassword(data);
    }

    return { changePassword };
}
