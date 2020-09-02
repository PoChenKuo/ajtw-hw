<template>
  <video-panel
    class="home"
    :isLoading="isLoading"
    :videoSurfingPage="videoSurfingPage"
    :videoCapacity="videoCapacity"
    :updateVideoSurfingPage="updateVideoSurfingPage"
    :videoList="videoList"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ytAPI } from "@/youtubeDataAPI";
import { getLikeAttachList } from "@/likeAttach";
import VideoPanel from "@/components/VideoPanel";
import VideoListMixin from "@/components/VideoListMixin";

let _this = null;
export default {
  name: "Home",
  components: { VideoPanel },
  data() {
    return {
      isLoading: true
    };
  },
  mixins: [VideoListMixin],
  computed: {
    ...mapState([
      "preference",
      "nextPageToken",
      "videoCapacity",
      "videoSurfingPage",
      "likeList"
    ]),
    ...mapState({
      videos: "storedVideos"
    }),
    targetVideos() {
      return [...this.videos].filter(e => {
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
    },
    videoList() {
      let source = [...this.targetVideos];
      source = source.map(e => _this.getVideoCardFormat(e));
      getLikeAttachList(this.likeList, source).forEach(e => (e.like = true));

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
      "updateVideoSurfingPage"
    ]),
    init() {
      if (this.checkExistData() === 0) {
        this.updateVideoSurfingPage(1);
      } else {
        this.isLoading = false;
      }
    },
    fetchVideos(videoNum) {
      _this.youtubeVideoLoad(videoNum).then(data => {
        const pageInfo = data.pageInfo;
        _this.updateVideoInfo(data);
        data.nextPageToken && _this.updateNextPageToken(data.nextPageToken);

        if (!_this.checkVideoLoadingInitialStatus(data)) {
          _this.initVideoCaptacity(pageInfo);
        }
        _this.videoCollectingHandle(pageInfo, videoNum);
      });
    },
    videoCollectingHandle(pageInfo, videoNum) {
      if (pageInfo && pageInfo.resultsPerPage) {
        if (pageInfo.resultsPerPage < videoNum) {
          _this.fetchVideos(videoNum - pageInfo.resultsPerPage);
        } else {
          _this.isLoading = false;
        }
      }
    },
    initVideoCaptacity(pageInfo) {
      const num =
        pageInfo.totalResults <= _this.KEYWORD.MAXIMUM_VIDEO_SIZE
          ? pageInfo.totalResults
          : _this.KEYWORD.MAXIMUM_VIDEO_SIZE;
      _this.setVideoCapacity(num);
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
            resolve(res);
          });
      });
    },
    updateVideoInfo(data) {
      if (data.items.length) {
        _this.appendVideos(data.items);
      }
    },
    checkExistData() {
      return Math.ceil((this.videos.length * 1.0) / this.pageSize);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
