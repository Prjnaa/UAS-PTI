export const userState = {
    currentUser: null,
  };

  export const storedUserState = localStorage.getItem("userState");
  if (storedUserState) {
    userState.currentUser = JSON.parse(storedUserState).currentUser;
  }

  export const saveUserStateToLocalStorage = () => {
    localStorage.setItem("userState", JSON.stringify(userState));
  };
  