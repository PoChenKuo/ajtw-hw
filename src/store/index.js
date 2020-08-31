import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curPage: "",
    preference: {
      chart: "mostPopular",
      maxResults: 12,
      regionCode: "TW"
    },
    videoCapacity: 0,
    storedVideos: [],
    nextPageToken: "",
    videoSurfingPage: 0
  },
  mutations: {
    currentPage(state, payload) {
      state.curPage = payload;
    },
    appendVideos(state, payload) {
      state.storedVideos = [...state.storedVideos, ...payload];
    },
    updateNextPageToken(state, payload) {
      state.nextPageToken = payload;
    },
    setVideoCapacity(state, payload) {
      state.videoCapacity = payload;
    },
    updateVideoSurfingPage(state, payload) {
      state.videoSurfingPage = payload;
    }
  },
  actions: {
    currentPage({ commit }, payload) {
      commit("currentPage", payload);
    },
    appendVideos({ commit }, payload) {
      commit("appendVideos", payload);
    },
    updateNextPageToken({ commit }, payload) {
      commit("updateNextPageToken", payload);
    },
    setVideoCapacity({ commit }, payload) {
      commit("setVideoCapacity", payload);
    },
    updateVideoSurfingPage({ commit }, payload) {
      commit("updateVideoSurfingPage", payload);
    }
  },
  modules: {}
});
