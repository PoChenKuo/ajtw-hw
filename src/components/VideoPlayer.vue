<template>
  <div>
    <video ref="videoPlayer" class="video-js" autoplay="true" controls="true" preload="auto"></video>
  </div>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    link: {
      type: String,
      default() {
        return "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
      }
    },
    options: {
      type: Object,
      default() {
        return {
          aspectRatio: "16:9",
          breakpoints: {
            tiny: 300,
            xsmall: 400,
            small: 500,
            medium: 600,
            large: 700,
            xlarge: 800,
            huge: 900
          },
          liveui: true,
          responsive: true
        };
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  computed: {
    videoOption() {
      return Object.assign({}, this.options, {
        sources: [
          {
            src: this.link,
            type: this.getVideoType(this.link) && "application/x-mpegURL"
          }
        ]
      });
    }
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.videoOption,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    getVideoType(url) {
      const ext = url.match(/.(m3u8|mp4|mpeg)$/);
      console.log(ext);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~video.js/dist/video-js.css";
</style>
