
<script>
import _KEYS from "@/keyword";

export default {
  name: "VideoPanel",
  data() {
    return {
      KEYWORD: _KEYS,
      pageSize: _KEYS.DEFAULT_VIDEO_LENGTH_PER_PAGE
    };
  },
  methods: {
    fetchVideos() {},
    checkVideoLoadingInitialStatus(data) {
      return !(
        data &&
        data.pageInfo &&
        data.pageInfo.totalResults &&
        this.videoCapacity === 0
      );
    },
    pageChange(pageNum) {
      let target = pageNum * this.pageSize;
      target =
        target <= this.videoCapacity || !this.videoCapacity
          ? target
          : this.videoCapacity;
      if (this.videos.length < target) {
        this.isLoading = true;
        this.fetchVideos(target - this.videos.length);
      } else {
        this.isLoading = false;
      }
    },
    getVideoCardFormat(e) {
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
    }
  }
};
</script>
