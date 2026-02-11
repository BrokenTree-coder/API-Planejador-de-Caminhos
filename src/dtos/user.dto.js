/**
 * DTO para a resposta da entidade User.
 * Formata os dados que serão enviados ao cliente, omitindo a senha.
 */
export class UserResponseDTO {
    constructor(user) {
        this.id = user.id;
        this.nome = user.nome;
        this.email = user.email;
        this.role = user.role;
    }
}