import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import firebase from '@/firebase';
import 'firebase/auth';
import 'firebase/database';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    apiUrl: 'https://api.edamam.com/search',
    user: null,
    isAuthenticated: false,
    userRecipes: []
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserRecipes(state, payload) {
      state.userRecipes = payload;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  actions: {
    async getRecipes({ state, commit }, plan) {
      try {
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: '910d1e23',
            app_key: '92563092e13b20b381e511c7b9b6936f',
            from: 0,
            to: 9,
          },
        });
        commit('setRecipes', response.data.hits);
      } catch (err) {
        commit('setRecipes', []);
      }
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch((err) => {
          console.log(err);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        });
    },
    userLogin({commit}, {email, password}) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch((err) => {
          console.log(err);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        })
    },
    userLogout({commit}) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          commit('setUserRecipes', []);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          commit('setUserRecipes', []);
          router.push('/')
        })
    },
    addRecipe({state}, payload) {
      firebase
        .database()
        .ref('users')
        .child(state.user.user.uid)
        .push(payload.recipe.label);
    },
    getUserRecipes({state, commit}) {
      if(state.user) {
        return firebase
                  .database()
                  .ref('users/' + state.user.user.uid)
                  .once('value', snapshot => {
                    commit('setUserRecipes', snapshot.val());
                  });
      }
    }
  },
  modules: {},
});
