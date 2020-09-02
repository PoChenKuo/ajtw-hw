<template>
  <div class="navigation">
    <span
      class="option-item home"
      @click="$route.path!=='/'&&$router.push('/')"
      :class="{active:curPage===KEYWORD.PAGE_KEY_HOME}"
    >
      <font-awesome-icon :icon="fasTv" />
      <span>Home</span>
    </span>

    <span
      class="option-item favorite"
      @click="$route.path!=='/collect'&&$router.push('/collect')"
      :class="{active:curPage===KEYWORD.PAGE_KEY_COLLECT}"
    >
      <font-awesome-icon :icon="fasBookmark" />
      <span>Favorite</span>
    </span>

    <span
      class="option-item page"
      @click="pageSwitchEnable = !pageSwitchEnable"
      :class="{active:pageSwitchEnable}"
    >
      <font-awesome-icon :icon="fasSwatchbook" />
      <span>Page</span>
    </span>

    <span class="option-item setting" @click="openSetting">
      <font-awesome-icon :icon="fasCogs" />
      <span>Setting</span>
    </span>
    <transition name="fadeTop">
      <div class="page-switch-panel" v-if="pageSwitchEnable">
        <page-switch
          :videoSurfingPage="videoSurfingPage"
          :videoCapacity="videoCapacity"
          :updateVideoSurfingPage="updateVideoSurfingPage"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import _KEYS from "@/keyword";
import {
  faTv as fasTv,
  faBookmark as fasBookmark,
  faCogs as fasCogs,
  faSwatchbook as fasSwatchbook
} from "@fortawesome/free-solid-svg-icons";
import PageSwitch from "@/components/PageSwitch";

export default {
  name: "Navigation",
  components: {
    PageSwitch,
    // eslint-disable-next-line vue/no-unused-components
    fasTv,
    // eslint-disable-next-line vue/no-unused-components
    fasBookmark,
    // eslint-disable-next-line vue/no-unused-components
    fasCogs,
    // eslint-disable-next-line vue/no-unused-components
    fasSwatchbook
  },
  props: ["curPage"],
  data() {
    return {
      pageSwitchEnable: false,
      fasTv: fasTv,
      fasBookmark: fasBookmark,
      fasCogs: fasCogs,
      fasSwatchbook: fasSwatchbook,
      KEYWORD: _KEYS
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  computed: {
    ...mapState({
      likeList: "likeList",
      homeVideoSurfingPage: "videoSurfingPage",
      likeVideoSurfuringPage: "likeVideoSurfuringPage"
    }),
    isHome() {
      return this.curPage === "home";
    },
    videoSurfingPage() {
      return this.isHome
        ? this.homeVideoSurfingPage
        : this.likeVideoSurfuringPage;
    },

    updateVideoSurfingPage() {
      return this.isHome
        ? this.updateHomeVideoSurfingPage
        : this.updateLikeVideoSurfingPage;
    },

    videoCapacity() {
      return this.isHome
        ? this.KEYWORD.MAXIMUM_VIDEO_SIZE
        : this.likeList.length;
    }
  },
  methods: {
    ...mapActions({
      updateHomeVideoSurfingPage: "updateVideoSurfingPage",
      updateLikeVideoSurfingPage: "updateLikeVideoSurfingPage",
      setPreferencePopupEnable: "setPreferencePopupEnable"
    }),
    openSetting() {
      this.setPreferencePopupEnable(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/navigation.scss";
@import "~@/scss/transition.scss";
</style>
