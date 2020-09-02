
<script>
import _KEYS from "@/keyword";

export default {
  name: "VideoListMixin",
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
      let targetVideoNumber = pageNum * this.pageSize;
      targetVideoNumber =
        targetVideoNumber <= this.videoCapacity || !this.videoCapacity
          ? targetVideoNumber
          : this.videoCapacity;
      const existingVideoLength = this.videos.length;
      if (existingVideoLength < targetVideoNumber) {
        this.isLoading = true;
        this.fetchVideos(targetVideoNumber - existingVideoLength);
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
