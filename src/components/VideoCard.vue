<template>
  <div class="video-card">
    <div class="image" :style="{
        'background-image':`url('${image}')`
    }">
      <div class="time">{{time}}</div>
      <div class="cover inner"></div>
    </div>
    <div class="detail">
      <div class="title">{{title}}</div>
      <div class="description">{{description}}</div>
    </div>
    <div class="cover outter"></div>
    <div class="like"></div>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: ["duration", "title", "description", "image", "code"],
  data() {
    return {};
  },
  mounted() {
    console.log(
      this.duration,
      this.title,
      this.description,
      this.image,
      this.code
    );
  },
  computed: {
    time() {
      let result = "";
      if (!this.duration) {
        return "";
      }
      let str = this.duration && this.duration.replace(/PT/, "");
      do {
        const search = str.match(/(H|M|S)/);
        if (search !== null) {
          const num = str.substr(0, search.index).padStart(2, "0");
          result += num + search[0];
        }
        str = str.substring(search.index + 1, str.length);
      } while (str.match(/(H|M|S)/));
      return result.toLowerCase();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/videoCard.scss";
</style>
