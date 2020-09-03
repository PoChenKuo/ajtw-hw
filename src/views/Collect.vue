<template>
  <video-panel
    class="collect"
    :isLoading="isLoading"
    :videoSurfingPage="videoSurfingPage"
    :videoCapacity="likes.length"
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
  name: "Collect",
  components: { VideoPanel },
  data() {
    return {
      isLoading: true,
      videos: [],

      likes: []
    };
  },
  mixins: [VideoListMixin],
  computed: {
    ...mapState(["likeList"]),
    ...mapState({
      videoSurfingPage: "likeVideoSurfuringPage"
    }),
    targetVideoList() {
      const startInd =
        (this.videoSurfingPage - 1) *
        this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE;
      const endInd = startInd + this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE;
      return this.likes.slice(startInd, endInd).join(",");
    },

    videoList() {
      let source = [...this.videos];
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
      nv && this.fetchVideos();
    }
  },
  methods: {
    ...mapActions(["updateNextPageToken", "setVideoCapacity"]),
    ...mapActions({
      updateVideoSurfingPage: "updateLikeVideoSurfingPage"
    }),
    init() {
      this.likes = [...this.likeList];
      const maxPageNumber = Math.ceil(
        this.likes.length / this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE
      );
      if (this.videoSurfingPage > maxPageNumber) {
        if (maxPageNumber > 0) this.updateVideoSurfingPage(1);
        else this.isLoading = false;
      } else {
        this.fetchVideos();
      }
    },
    fetchVideos(prev = null) {
      if (this.targetVideoList.length > 0) {
        _this
          .youtubeVideoLoad()
          .then(data => {
            const items = data.items;
            items.forEach((entry, ind) => {
              entry.vid =
                (_this.videoSurfingPage - 1) *
                  this.KEYWORD.DEFAULT_VIDEO_LENGTH_PER_PAGE +
                ind;
            });
            _this.videos = items;
            _this.isLoading = false;
          })
          .catch(e => {
            //
          });
      } else {
        this.isLoading = false;
      }
    },
    youtubeVideoLoad() {
      return new Promise((resolve, reject) => {
        ytAPI
          .getListContent({
            id: _this.targetVideoList
          })
          .then(res => {
            // resolve(res);
            if (res.success) {
              resolve(res.data);
            } else {
              reject(res);
            }
          });
      });
    },

    checkExistData() {
      return Math.ceil((this.videos.length * 1.0) / this.pageSize);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
