export const isLoggedIn = (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
}

export const setLogin = (): void => {
    localStorage.setItem('isLoggedIn', 'true');
}

export const clearLogin = (): void => {
    localStorage.removeItem('isLoggedIn');
}