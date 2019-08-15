export const state = () => ({
  isLoggedIn: false
});

export const mutations = {
  logOut(state) {
    localStorage.removeItem('state');
    state.isLoggedIn = localStorage.getItem('state');
  },

  logIn(state) {
    localStorage.setItem('state', 'loggedIn');
    state.isLoggedIn = localStorage.getItem('state');
  }
};
