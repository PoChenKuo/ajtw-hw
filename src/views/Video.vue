<template>
  <div class="panel">
    <div class="title" ref="panel" :class="{over:textOver.over}">
      <span ref="title-text" :style="textOver.over?textOverAnimateStyle:{}">{{title}}</span>
    </div>
    <video-player />
    <div class="context" v-html="context.replace(/\n/g,'<br>')"></div>
    <div v-html="textOverAnimate"></div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import { ytAPI } from "@/youtubeDataAPI";
import VideoPlayer from "@/components/VideoPlayer";
export default {
  name: "Video",
  components: { VideoPlayer },
  props: {},
  watch: {
    "$route.params.vid"(nv, ov) {
      console.log(nv, ov);
    },
    title() {
      this.$nextTick(() => {
        this.calcTextOver();
      });
    }
  },
  computed: {
    videoPlayerOption() {
      return {};
    },

    textOverAnimateStyle() {
      return {
        "animation-iteration-count": "infinite",
        "animation-duration": `${Math.ceil(this.textOver.textWidth / 80)}s`
      };
    },
    textOverAnimate() {
      return `<style>@keyframes textOverAnimate {
      from {
        margin-left: 0;
      }
      to {
        margin-left: ${this.textOver.textWidth * -1}px;
      }
      }</style>`;
    }
  },
  data() {
    return {
      vid: null,
      title: "default title",
      context: "default context : 213213213sasfsdfsdf",
      textOver: { over: false }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.vid = this.$route.params.vid;
      if (this.vid) {
        this.fetchVideo();
      }
    });
  },
  methods: {
    fetchVideo() {
      const _this = this;
      ytAPI
        .getListContent({
          id: [this.vid]
        })
        .then(res => {
          if (res.success) {
            _this.loadVideoData(res);
          }
        });
    },
    loadVideoData(res) {
      const data =
        res.data &&
        res.data.items &&
        res.data.items[0] &&
        res.data.items[0].snippet;
      this.title = data.title;
      this.context = data.description;
    },
    calcTextOver() {
      const container = this.$refs.panel;
      const text = this.$refs["title-text"];
      if (container && text) {
        this.textOver = {
          over: text.offsetWidth > container.offsetWidth,
          textWidth: text.offsetWidth,
          width: container.offsetWidth
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  width: auto;
  font-size: 1em;
  color: #fff;
  line-height: 2em;
  overflow: hidden;
  span {
    width: auto;
    white-space: nowrap;
  }

  &.over {
    span {
      animation-name: textOverAnimate;
      animation-delay: 2s;
      animation-timing-function: linear;
    }
  }
}
.context {
  width: 100%;
  font-size: 1em;
  color: #eee;
  line-height: 1.5em;
  box-sizing: border-box;
  padding: 10px 5px;
}
</style>
