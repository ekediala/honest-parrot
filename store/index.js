export const state = () => ({
  loggedIn: false
});

export const mutations = {
  logOut(state) {
    state.isLoggedIn = false;
  },

  logIn(state) {
    state.isLoggedIn = true;
  }
};
