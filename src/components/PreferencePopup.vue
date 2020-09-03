<template>
  <transition name="fade">
    <div class="preference-popup-overlay" v-if="preferencePopupEnable">
      <div class="overlay-layer" @click="close" @mousewheel.prevent></div>
      <div class="preference-popup" @mousewheel.stop>
        <font-awesome-icon :icon="closeIcon" :class="['close-icon']" @click="close" />
        <div class="context">
          <div class="region items">
            <b>region</b>
            <select-option :value.sync="regionCode" :list="regionList" />
          </div>

          <div class="category items">
            <b>category</b>
            <select-option :value.sync="videoCategoryId" :list="categoryList" />
          </div>
        </div>
        <div class="apply-btn" @click="submit">
          <div>Apply</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { faTimes as closeIcon } from "@fortawesome/free-solid-svg-icons";
import { mapState, mapActions } from "vuex";
import SelectOption from "@/components/SelectOption";
import { ytAPI } from "@/youtubeDataAPI";

export default {
  name: "PreferencePopup",
  // eslint-disable-next-line vue/no-unused-components
  components: { closeIcon, SelectOption },
  data() {
    return {
      closeIcon: closeIcon,
      regionList: [
        { name: "TW", value: "TW" },
        { name: "DE", value: "DE" },
        { name: "US", value: "US" },
        { name: "JP", value: "JP" }
      ],
      regionCode: null,
      videoCategoryId: "0",
      categorySource: []
    };
  },
  watch: {
    regionCode(nv, ov) {
      if (ov !== nv) {
        // console.log(nv);
        ytAPI.getCategory({ regionCode: nv }).then(res => {
          if (res.success) {
            const data = res.data;
            this.categorySource = [...data].map(e => ({
              value: e.id,
              name: e.name
            }));
          }
        });
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
      list.push({ value: "0", name: "ALL" });
      return [...list, ...this.categorySource];
    }
  },
  methods: {
    ...mapActions(["setPreferencePopupEnable", "updatePreference"]),
    close() {
      this.setPreferencePopupEnable(false);
    },
    loadPreference() {
      if (!this.regionCode) {
        this.regionCode = this.preference.regionCode;
        this.videoCategoryId = this.preference.videoCategoryId;
      }
    },
    submit() {
      this.updatePreference({
        regionCode: this.regionCode,
        videoCategoryId: this.videoCategoryId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/transition.scss";
@import "~@/scss/preference-popup.scss";
</style>
