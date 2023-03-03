<script>
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";

export default {
  name: "Viewer",
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
  <div class="viewer wrapper">
   
  </div>
</template>