export const isLoggedIn = (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
}

export const setLogin = (userId: string): void => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);  
}

export const clearLogin = (): void => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId'); 
}