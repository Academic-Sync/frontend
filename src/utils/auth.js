// Função para verificar se o usuário está autenticado
export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true se o token existir
}

// Função para obter o tipo de usuário do localStorage
export function getUserType() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.user_type : null; // Retorna o tipo de usuário, se existir
}

// Função para obter o usuário do localStorage
export function getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user : null; // Retorna o tipo de usuário, se existir
}

// Função para verificar se o usuário tem permissão
export function hasPermission(requiredUserType) {
    const userType = getUserType();
    return requiredUserType.includes(userType) || userType == 'admin'
}

export function getToken() {
    const token = localStorage.getItem('token');
    return token ? token : null; // Retorna o tipo de usuário, se existir
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}