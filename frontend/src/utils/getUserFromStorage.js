export const getUserFromStorage = () => {
    const token = JSON.parse(localStorage.getItem('userInfo') || null)
    return token?.token
    // console.log(token);
}