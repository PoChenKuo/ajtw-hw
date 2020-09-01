<template>
  <div class="home">
    <!-- <div @click="fetchVideos(12)">load more</div> -->
    <div class="list">
      <video-card
        v-for="(item,ind) in videoList"
        :key="ind"
        :code="item.code"
        :description="item.description"
        :title="item.title"
        :image="item.image"
        :duration="item.duration"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import VideoCard from "@/components/VideoCard";
import { ytAPI } from "@/youtubeDataAPI";
import _KEYS from "@/keyword";
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
      "videoSurfingPage"
    ]),
    videoList() {
      const source = this.storedVideos;
      return source.map(e => {
        const snippet = e.snippet;
        return {
          title: snippet.title,
          description: snippet.description,
          code: e.id,
          image: snippet.thumbnails.default.url,
          duration: e.contentDetails.duration
        };
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      _this = this;
      this.init();
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
      "updateVideoSurfingPage"
    ]),
    init() {
      if (this.checkExistData() === 0) {
        // this.fetchVideos(this.pageSize);
        this.updateVideoSurfingPage(1);
      }
    },
    fetchVideos(videoNum) {
      ytAPI
        .getListContent({
          chart: this.preference.chart,
          maxResults: videoNum,
          regionCode: this.preference.regionCode,
          pageToken: this.nextPageToken ? this.nextPageToken : ""
        })
        .then(res => res.json())
        .then(data => {
          if (data.items.length) {
            _this.appendVideos(data.items);
          }
          data.nextPageToken && _this.updateNextPageToken(data.nextPageToken);

          if (
            data.pageInfo &&
            data.pageInfo.totalResults &&
            _this.videoCapacity === 0
          ) {
            const num =
              data.pageInfo.totalResults <= 100
                ? data.pageInfo.totalResults
                : 100;
            _this.setVideoCapacity(num);
          }
        });
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
.page-home {
  .list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>
