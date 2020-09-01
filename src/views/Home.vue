<template>
  <div class="home">
    <!-- <div @click="fetchVideos(12)">load more</div> -->
    <transition-group tag="list" class="list" name="fade">
      <video-card
        v-for="item in videoList"
        :key="item.vid"
        :code="item.code"
        :description="item.description"
        :title="item.title"
        :image="item.image"
        :duration="item.duration"
        :like="item.like"
      />
    </transition-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import VideoCard from "@/components/VideoCard";
import { ytAPI } from "@/youtubeDataAPI";
import _KEYS from "@/keyword";
import { getLikeAttachList } from "@/likeAttach";
let _this = null;
export default {
  name: "Home",
  components: { VideoCard },
  data() {
    return { KEYWORD: _KEYS, pageSize: 12 };
  },
  computed: {
    ...mapState([
      "preference",
      "storedVideos",
      "nextPageToken",
      "videoCapacity",
      "videoSurfingPage",
      "likeList"
    ]),
    videoList() {
      let source = [...this.storedVideos];
      source = source.map(e => {
        const snippet = e.snippet;
        let image = snippet.thumbnails;
        image =
          image.maxres ||
          image.standard ||
          image.height ||
          image.medium ||
          image.default;
        return {
          title: snippet.title,
          description: snippet.description,
          code: e.id,
          image: image.url,
          duration: e.contentDetails.duration,
          like: false,
          vid: e.vid
        };
      });
      const list = getLikeAttachList(this.likeList, source);
      list.forEach(e => (e.like = true));
      return source;
    }
  },
  mounted() {
    this.$nextTick(() => {
      _this = this;
      this.init();
      // this.addLike(["PWmXREMAxl4"]);
    });
  },
  watch: {
    videoSurfingPage(nv, ov) {
      this.pageChange(nv);
    }
  },
  methods: {
    ...mapActions([
      "appendVideos",
      "updateNextPageToken",
      "setVideoCapacity",
      "updateVideoSurfingPage",
      "removeLike",
      "addLike"
    ]),
    init() {
      if (this.checkExistData() === 0) {
        this.updateVideoSurfingPage(1);
      }
    },
    fetchVideos(videoNum) {
      _this.youtubeVideoLoad(videoNum).then(data => {
        _this.upDateVideoInfo(data);
        data.nextPageToken && _this.updateNextPageToken(data.nextPageToken);

        if (!_this.checkVideoLoadingInitialStatus(data)) {
          const num =
            data.pageInfo.totalResults <= 100
              ? data.pageInfo.totalResults
              : 100;
          _this.setVideoCapacity(num);
        }
      });
    },
    youtubeVideoLoad(videoNum) {
      return new Promise(resolve => {
        ytAPI
          .getListContent({
            chart: this.preference.chart,
            maxResults: videoNum,
            regionCode: this.preference.regionCode,
            pageToken: this.nextPageToken ? this.nextPageToken : ""
          })
          .then(res => {
            resolve(res.json());
          });
      });
    },
    checkVideoLoadingInitialStatus(data) {
      return !(
        data &&
        data.pageInfo &&
        data.pageInfo.totalResults &&
        _this.videoCapacity === 0
      );
    },
    upDateVideoInfo(data) {
      if (data.items.length) {
        _this.appendVideos(data.items);
      }
    },
    checkExistData() {
      return Math.ceil((this.storedVideos.length * 1.0) / this.pageSize);
    },
    pageChange(pageNum) {
      let target = pageNum * this.pageSize;
      target =
        target <= this.videoCapacity || !this.videoCapacity
          ? target
          : this.videoCapacity;
      if (this.storedVideos.length < target) {
        this.fetchVideos(target - this.storedVideos.length);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/transition.scss";

.page-home {
  .list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>
