<template>
  <transition name="fade">
    <div class="description-popup-overlay" v-if="descriptionPopupEnable">
      <div class="overlay-layer" @click="close" @mousewheel.prevent></div>
      <div class="description-popup" @mousewheel.stop>
        <font-awesome-icon :icon="closeIcon" :class="['close-icon']" @click="close" />
        <div class="context">
          <div class="title">{{descriptionPopupContent.title}}</div>
          <div class="description">{{descriptionPopupContent.description}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { faTimes as closeIcon } from "@fortawesome/free-solid-svg-icons";
import { mapState, mapActions } from "vuex";

export default {
  name: "DescriptionPopup",
  // eslint-disable-next-line vue/no-unused-components
  components: { closeIcon },
  data() {
    return { closeIcon: closeIcon };
  },
  computed: {
    ...mapState(["descriptionPopupEnable", "descriptionPopupContent"])
  },
  methods: {
    ...mapActions(["setDescriptionPopupEnable"]),
    close() {
      this.setDescriptionPopupEnable(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/transition.scss";
@import "~@/scss/description-popup.scss";
</style>
