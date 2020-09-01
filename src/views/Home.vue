<template>
  <div class="home">
    <!-- <div @click="fetchVideos(12)">load more</div> -->
    <transition-group tag="div" class="list" name="fade" v-if="!isLoading">
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
    <page-switch v-if="!isLoading" />
    <transition name="fade" v-if="isLoading">
      <div class="loading-container">
        <div class="loading"></div>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import { ytAPI } from "@/youtubeDataAPI";

import { getLikeAttachList } from "@/likeAttach";
import VideoCard from "@/components/VideoCard";
import PageSwitch from "@/components/PageSwitch";
import _KEYS from "@/keyword";
let _this = null;
export default {
  name: "Home",
  components: { VideoCard, PageSwitch },
  data() {
    return {
      KEYWORD: _KEYS,
      pageSize: _KEYS.DEFAULT_VIDEO_LENGTH_PER_PAGE,
      isLoading: true
    };
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
      source = source.filter(e => {
        return (
          e.vid >=
            (_this.videoSurfingPage - 1) *
              _this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE &&
          e.vid <
            _this.videoSurfingPage *
              _this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE &&
          e.vid < _this.videoCapacity
        );
      });
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
        const pageInfo = data.pageInfo;
        _this.upDateVideoInfo(data);
        data.nextPageToken && _this.updateNextPageToken(data.nextPageToken);

        if (!_this.checkVideoLoadingInitialStatus(data)) {
          const num =
            pageInfo.totalResults <= _this.KEYWORD.MAXIMUM_VIDEO_SIZE
              ? pageInfo.totalResults
              : _this.KEYWORD.MAXIMUM_VIDEO_SIZE;
          _this.setVideoCapacity(num);
        }
        if (pageInfo && pageInfo.resultsPerPage) {
          if (pageInfo.resultsPerPage < videoNum) {
            _this.fetchVideos(videoNum - pageInfo.resultsPerPage);
          } else {
            _this.isLoading = false;
          }
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
        this.isLoading = true;
        this.fetchVideos(target - this.storedVideos.length);
      } else {
        this.isLoading = false;
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

.loading-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.loading {
  background-image: url("~@/assets/load.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 300px;
}
</style>
