import Vue from 'vue';
import { firestoreDB, auth } from '../config/firebase';

const firePlugin = {
  install() {
    if (Vue.__nuxt_firebase_installed__) {
      return;
    }
    Vue.__nuxt_firebase_installed__ = true;
    if (!Vue.prototype.$DB) {
      Vue.prototype.$firestore = firestoreDB;
      Vue.prototype.$auth = auth;
    }
  }
};

Vue.use(firePlugin);

export default (ctx) => {
  const { app, store } = ctx;

  app.$firestore = Vue.prototype.$firestore;
  ctx.$firestore = Vue.prototype.$firestore;

  app.$auth = Vue.prototype.$auth;
  ctx.$auth = Vue.prototype.$auth;

  if (store) {
    store.$firestore = Vue.prototype.$firestore;
    store.$auth = Vue.prototype.$auth;
  }
};
