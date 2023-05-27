export const userState = {
    currentUser: null,
  };
  
  const storedUserState = localStorage.getItem("userState");
  if (storedUserState) {
    const parsedUserState = JSON.parse(storedUserState);
    userState.currentUser = parsedUserState.currentUser;
  }
  
  export const saveUserStateToLocalStorage = () => {
    localStorage.setItem("userState", JSON.stringify(userState));
  };
  