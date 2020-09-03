<template>
  <div class="select-option" ref="entry">
    <div class="overlay" @click="(open=false)" v-if="open"></div>

    <div class="select" @click="open=!open" :class="{active:open}">{{name}}</div>
    <transition name="fade">
      <div class="option-list" v-if="open" :style="optionPos">
        <div
          v-for="(item,ind) in list"
          :key="ind"
          @click="change(item)"
          class="option"
        >{{item.name}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SelectOption",
  props: ["value", "list"],
  data() {
    return {
      open: false
    };
  },
  computed: {
    name() {
      const target = this.list.find(e => e.value === this.value);
      return (target && target.name) || "  ";
    },
    optionPos() {
      const ref = this.$refs.entry;
      const box = ref.getBoundingClientRect();
      return {
        top: box.y + ref.offsetHeight + "px",
        left: box.x + "px",
        width: ref.offsetWidth + "px"
      };
    }
  },
  methods: {
    change(item) {
      //   this.value = item.value;
      this.$emit("update:value", item.value);
      this.open = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/transition.scss";

.select-option {
  width: auto;
  position: relative;
  .overlay {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .select {
    position: relative;
    display: block;
    text-align: center;
    width: 100%;
    border: 1px solid #aaa;
    border-radius: 100px;
    &:hover,
    &.active {
      border-color: #777;
    }
  }
  .option-list {
    z-index: 12;
    position: fixed;
    // left: 0;
    // top: 100%;
    // width: 100%;
    margin-top: 5px;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 3px #000;
    border-radius: 5px;
    max-height: 300px;
    overflow: auto;

    .option {
      position: relative;
      text-align: center;
      width: 100%;
      cursor: pointer;
      border-radius: 2px;
      &:hover {
        background-color: #dcf1c1;
      }
    }
  }
}
</style>
