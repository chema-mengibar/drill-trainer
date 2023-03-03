<script>
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";

export default {
  name: "FrameEditor",
  inject: ["$services"],
  data: () => ({
    t: {},
   
  }),
  methods: {

  },

  created() {
    this.t = this.$services.localeService.D();
  },

  mounted() {
    const _ = this;

   
  },
  computed: {
   
  },
  components: {
    ButtonAccentBig,
  },
};
</script>

<style  lang="scss">
@import "../styles/media";




</style>

<template>
  <div class="frame-editor wrapper">
   
  </div>
</template>