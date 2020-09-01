<template>
  <div id="app" :class="[`page-${curPage}`]" @mousewheel="middleMousedown">
    <transition name="fade">
      <router-view :class="['context-panel']" />
    </transition>
    <navigation :cur-page="curPage" :class="{scrollDown:mouseWheelDown}" />
    <description-popup />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Navigation from "@/components/Navigation";
import DescriptionPopup from "@/components/DescriptionPopup";
export default {
  name: "App",
  components: { Navigation, DescriptionPopup },
  data() {
    return {
      mouseWheelDown: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  watch: {
    $route(nv) {
      this.currentPage(nv.name.toLowerCase());
      this.setDescriptionPopupEnable(false);
    },
    likeList(nv) {
      window.localStorage.like = JSON.stringify(nv);
    }
  },
  computed: {
    ...mapState(["curPage", "likeList", "updatePerference"])
  },
  methods: {
    ...mapActions(["currentPage", "addLike", "setDescriptionPopupEnable"]),
    init() {
      if (!window.localStorage.perference) {
        window.localStorage.perference = JSON.stringify({
          chart: "mostPopular",
          regionCode: "TW"
        });
      }
      this.currentPage((this.$route.name || "").toLowerCase());
      this.addLike(JSON.parse(window.localStorage.like));
      this.updatePerference(JSON.parse(window.localStorage.perference));
    },
    middleMousedown(event) {
      this.mouseWheelDown = event.deltaY > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/transition.scss";
@import "~@/scss/app";
@import "~@/scss/contextPanel";
</style>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 16px;
  overflow: hidden;
}
#app {
  position: relative;
  display: inline-block;
  width: 100%;
}
</style>
