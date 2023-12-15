export const useGetUserInfo =() =>{
    const {userId,name, profileImg, isAuthenticated} = JSON.parse(localStorage.getItem('auth')) || {};
    return {userId,name, profileImg, isAuthenticated};
}
