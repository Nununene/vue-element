// === Store getters ===
// Access state variable (Read ONLY)

export const loginState = state => state.isLoggedIn;

export const authInfo = state => {
  return state.authInfo;
};
export const unsavedFlag = state => {
  return (state.unsaved === true);
};
