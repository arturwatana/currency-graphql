export function validateUserInfo({ email, password, fullName }) {
    if (!fullName) {
        throw new Error("Ops, ficou faltando o seu nome");
    }
    if (fullName.length <= 2) {
        throw new Error("Seu nome precisa ter mais que 2 caracteres");
    }
    if (!email) {
        throw new Error("Ops, ficou faltando o email");
    }
    if (email.length < 4) {
        throw new Error("Ops, preciso de um email valido");
    }
    if (email.includes("@") === false) {
        throw new Error("Ops, preciso de um email valido");
    }
    if (!password) {
        throw new Error("Ops, ficou faltando sua senha");
    }
    if (password.length < 6) {
        throw new Error("Sua senha precisa ter pelo menos 6 caracteres");
    }
}
