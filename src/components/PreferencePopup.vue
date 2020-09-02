<template>
  <transition name="fade">
    <div class="preference-popup-overlay" v-if="preferencePopupEnable">
      <div class="overlay-layer" @click="close" @mousewheel.prevent></div>
      <div class="preference-popup" @mousewheel.stop>
        <font-awesome-icon :icon="closeIcon" :class="['close-icon']" @click="close" />
        <div class="context">
          <div class="region">
            <b>region</b>
            <select v-model="regionCode">
              <option v-for="(item, ind) in regionList" :value="item" :key="ind">{{item}}</option>
            </select>
          </div>

          <div class="region">
            <b>category</b>

            <select v-model="videoCategoryId">
              <option
                v-for="(item, ind) in categoryList"
                :value="item.code"
                :key="ind"
              >{{item.name}}</option>
            </select>
          </div>

          <div class="region">
            <b>clean likes</b>
          </div>
        </div>
        <div class="apply-btn">
          <span>Apply</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { faTimes as closeIcon } from "@fortawesome/free-solid-svg-icons";
import { mapState, mapActions } from "vuex";

export default {
  name: "PreferencePopup",
  // eslint-disable-next-line vue/no-unused-components
  components: { closeIcon },
  data() {
    return {
      closeIcon: closeIcon,
      regionList: ["TW", "DE", "US", "JP"],
      regionCode: null,
      videoCategoryId: null
    };
  },
  watch: {
    regionCode(nv, ov) {
      if (ov !== nv) {
        console.log(nv);
      }
    },
    preferencePopupEnable(nv) {
      if (nv) {
        this.loadPreference();
      }
    }
  },
  computed: {
    ...mapState(["preference", "preferencePopupEnable"]),
    categoryList() {
      const list = [];
      list.push({ code: "0", name: "ALL" });
      return list;
    }
  },
  methods: {
    ...mapActions(["setPreferencePopupEnable"]),
    close() {
      this.setPreferencePopupEnable(false);
    },
    loadPreference() {
      if (!this.regionCode) {
        this.regionCode = this.preference.regionCode;
        this.videoCategoryId = this.preference.videoCategoryId;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/transition.scss";
@import "~@/scss/preference-popup.scss";
</style>
