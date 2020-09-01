<template>
  <div class="navigation">
    <span
      class="option-item home"
      @click="$router.push('/')"
      :class="{active:curPage===KEYWORD.PAGE_KEY_HOME}"
    >
      <font-awesome-icon :icon="fasTv" />
      <span>Home</span>
    </span>

    <span
      class="option-item favorite"
      @click="$router.push('/collect')"
      :class="{active:curPage===KEYWORD.PAGE_KEY_COLLECT}"
    >
      <font-awesome-icon :icon="fasBookmark" />
      <span>Favorite</span>
    </span>

    <span class="option-item page" @click="pageSwitch = !pageSwitch" :class="{active:pageSwitch}">
      <font-awesome-icon :icon="fasSwatchbook" />
      <span>Page</span>
    </span>

    <span class="option-item setting" @click="openSetting">
      <font-awesome-icon :icon="fasCogs" />
      <span>Setting</span>
    </span>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import _KEYS from "@/keyword";
import {
  faTv as fasTv,
  faBookmark as fasBookmark,
  faCogs as fasCogs,
  faSwatchbook as fasSwatchbook
} from "@fortawesome/free-solid-svg-icons";
// let _this = null;
export default {
  name: "Navigation",
  components: {
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
      pageSwitch: false,
      fasTv: fasTv,
      fasBookmark: fasBookmark,
      fasCogs: fasCogs,
      fasSwatchbook: fasSwatchbook,
      KEYWORD: _KEYS
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(_KEYS);
    });
  },
  computed: {},
  methods: {
    openSetting() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/navigation.scss";
</style>
