<template>
  <div class="video-card">
    <div class="image" :style="{
        'background-image':`url('${image}')`
    }">
      <div class="time">{{time}}</div>
      <div class="cover inner"></div>
    </div>
    <div class="detail" @click.stop="openDescription">
      <div class="title">
        {{title}}
        <span class="like" :class="{active:like}" @click.stop="likeVideo(code, like)">
          <font-awesome-icon :icon="heartIcon" />
        </span>
      </div>
      <div class="description">{{description}}</div>
    </div>
    <div class="cover outter"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "VideoCard",
  props: ["duration", "title", "description", "image", "code", "like"],
  data() {
    return {
      heartIcon: fasHeart
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    fasHeart
  },
  mounted() {},
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
      return result.replace(/(H|M)/g, ":").replace(/S/, "");
    }
  },
  methods: {
    ...mapActions([
      "removeLike",
      "addLike",
      "setDescriptionPopupEnable",
      "updateDescriptionPopupContent"
    ]),
    likeVideo(code, like) {
      console.log(code, like);
      if (like) {
        this.removeLike(code);
      } else {
        this.addLike([code]);
      }
    },
    openDescription() {
      this.updateDescriptionPopupContent({
        title: this.title,
        description: this.description
      });
      this.setDescriptionPopupEnable(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/videoCard.scss";
</style>
