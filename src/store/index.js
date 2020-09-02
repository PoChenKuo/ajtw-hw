import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curPage: "",
    preference: {
      chart: "mostPopular",
      regionCode: "TW"
    },
    likeVideoSurfuringPage: 1,
    videoCapacity: 0,
    storedVideos: [],
    nextPageToken: "",
    videoSurfingPage: 0,
    likeList: [],
    descriptionPopupEnable: false,
    descriptionPopupContent: {
      title: "",
      description: ""
    }
  },
  mutations: {
    currentPage(state, payload) {
      state.curPage = payload;
    },
    appendVideos(state, payload) {
      const list = [...state.storedVideos, ...payload];
      list.forEach((e, ind) => (e.vid = ind));
      state.storedVideos = list;
    },
    updateNextPageToken(state, payload) {
      state.nextPageToken = payload;
    },
    setVideoCapacity(state, payload) {
      state.videoCapacity = payload;
    },
    updateVideoSurfingPage(state, payload) {
      state.videoSurfingPage = payload;
    },
    updateLikeVideoSurfingPage(state, payload) {
      state.likeVideoSurfuringPage = payload;
    },
    removeLike(state, payload) {
      const list = state.likeList.filter(e => e !== payload);
      state.likeList = list;
    },
    addLike(state, payload) {
      const list = [...state.likeList, ...payload];
      state.likeList = list;
    },
    updatePerference(state, payload) {
      state.preference = Object.assign({}, state.preference, payload);
    },
    setDescriptionPopupEnable(state, payload) {
      state.descriptionPopupEnable = payload;
    },
    updateDescriptionPopupContent(state, payload) {
      state.descriptionPopupContent = Object.assign(
        {},
        state.descriptionPopupContent,
        payload
      );
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
    },
    updateLikeVideoSurfingPage({ commit }, payload) {
      commit("updateLikeVideoSurfingPage", payload);
    },
    removeLike({ commit }, payload) {
      commit("removeLike", payload);
    },
    addLike({ commit }, payload) {
      commit("addLike", payload);
    },
    updatePerference({ commit }, payload) {
      commit("updatePerference", payload);
    },
    setDescriptionPopupEnable({ commit }, payload) {
      commit("setDescriptionPopupEnable", payload);
    },
    updateDescriptionPopupContent({ commit }, payload) {
      commit("updateDescriptionPopupContent", payload);
    }
  },
  modules: {}
});
