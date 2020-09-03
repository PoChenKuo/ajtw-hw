<template>
  <div>
    <video-player />
    <!-- <router-view /> -->
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
export default {
  name: "Video",
  components: { VideoPlayer },
  watch: {
    "$route.params.vid"(nv, ov) {
      console.log(nv, ov);
    }
  },
  computed: {
    videoPlayerOption() {
      return {};
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>

<style>
</style>
