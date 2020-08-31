<template>
  <div id="app" :class="[`page-${curPage}`]" @mousewheel="middleMousedown">
    <transition>
      <router-view :class="['context-panel']" />
    </transition>
    <navigation :cur-page="curPage" :class="{scrollDown:mouseWheelDown}" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Navigation from "@/components/Navigation";
export default {
  name: "App",
  components: { Navigation },
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
    }
  },
  computed: {
    ...mapState(["curPage"])
  },
  methods: {
    ...mapActions(["currentPage"]),
    init() {
      this.currentPage(this.$route.name.toLowerCase());
    },
    middleMousedown(event) {
      this.mouseWheelDown = event.deltaY > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
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
}
#app {
  position: relative;
  display: inline-block;
  width: 100%;
}
</style>
