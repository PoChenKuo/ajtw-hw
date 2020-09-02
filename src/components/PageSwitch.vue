<template>
  <div class="page-switch">
    <span
      class="grid-button"
      @click="!isBegin && updateVideoSurfingPage(1)"
      :class="{disabled:!prevOnePage.active}"
    >
      <font-awesome-icon :icon="faAngleDoubleLeft" :class="{disabled:isBegin}" />
    </span>
    <span
      class="grid-button"
      @click="prevOnePage.active && updateVideoSurfingPage(prevOnePage.number)"
      :class="{disabled:!prevOnePage.active}"
    >
      <font-awesome-icon :icon="faAngleLeft" :class="{disabled:isBegin}" />
    </span>
    <span
      class="grid-button"
      @click="prevTwoPage.active && updateVideoSurfingPage(prevTwoPage.number)"
      :class="{disabled:!prevTwoPage.active}"
    >{{prevTwoPage.active?prevTwoPage.number:'-'}}</span>
    <span
      class="grid-button"
      @click="prevOnePage.active && updateVideoSurfingPage(prevOnePage.number)"
      :class="{disabled:!prevOnePage.active}"
    >{{prevOnePage.active?prevOnePage.number:'-'}}</span>
    <span class="grid-button" :class="{active:true}">{{videoSurfingPage}}</span>
    <span
      class="grid-button"
      @click="nextOnePage.active && updateVideoSurfingPage(nextOnePage.number)"
      :class="{disabled:!nextOnePage.active}"
    >{{nextOnePage.active?nextOnePage.number:'-'}}</span>
    <span
      class="grid-button"
      @click="nextTwoPage.active && updateVideoSurfingPage(nextTwoPage.number)"
      :class="{disabled:!nextTwoPage.active}"
    >{{nextTwoPage.active?nextTwoPage.number:'-'}}</span>
    <span
      class="grid-button"
      @click="nextOnePage.active && updateVideoSurfingPage(nextOnePage.number)"
      :class="{disabled:!nextOnePage.active}"
    >
      <font-awesome-icon :icon="faAngleRight" :class="{disabled:isEnd}" />
    </span>
    <span
      class="grid-button"
      @click="nextOnePage.active && updateVideoSurfingPage(endPageNumber)"
      :class="{disabled:!nextOnePage.active}"
    >
      <font-awesome-icon :icon="faAngleDoubleRight" :class="{disabled:isEnd}" />
    </span>
  </div>
</template>

<script>
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import _KEYS from "@/keyword";
// import { mapState, mapActions } from "vuex";
export default {
  name: "PageSwitch",
  props: ["videoSurfingPage", "videoCapacity", "updateVideoSurfingPage"],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    faAngleLeft,
    // eslint-disable-next-line vue/no-unused-components
    faAngleRight,
    // eslint-disable-next-line vue/no-unused-components
    faAngleDoubleLeft,
    // eslint-disable-next-line vue/no-unused-components
    faAngleDoubleRight
  },
  computed: {
    // ...mapState(["videoSurfingPage", "videoCapacity"]),
    endPageNumber() {
      return Math.ceil(
        (this.videoCapacity * 1.0) / this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE
      );
    },
    isEnd() {
      return this.videoSurfingPage === this.endPageNumber;
    },
    isBegin() {
      return this.videoSurfingPage === 1;
    },
    prevOnePage() {
      const number = this.videoSurfingPage - 1;
      return {
        active: number >= 1,
        number
      };
    },
    prevTwoPage() {
      const number = this.videoSurfingPage - 2;
      return {
        active: number >= 1,
        number
      };
    },
    nextOnePage() {
      const number = this.videoSurfingPage + 1;
      return {
        active: number <= this.endPageNumber,
        number
      };
    },
    nextTwoPage() {
      const number = this.videoSurfingPage + 2;
      return {
        active: number <= this.endPageNumber,
        number
      };
    }
  },
  data() {
    return {
      KEYWORD: _KEYS,
      faAngleLeft,
      faAngleRight,
      faAngleDoubleLeft,
      faAngleDoubleRight
    };
  },
  methods: {
    // ...mapActions(["updateVideoSurfingPage"])
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/page-switch";
</style>
