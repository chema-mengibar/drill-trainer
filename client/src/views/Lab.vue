<script>

import Editor from "../views/Editor.vue";
import Viewer from "../views/Viewer.vue";


export default {
  name: "Lab",
  inject: ["$services"],
  data: () => ({
    t: {},

  }),
  methods: {},
  created() {
    const _ = this;
    _.t = this.$services.localeService.D();
  },
  mounted() {
  
  },
  components: {
    Editor,
    Viewer
  },
};
</script>

<style  lang="scss">
@import "../styles/media";

.lab{
  display: flex;
width: 100vw;
height: 100vh;
}

</style>

<template>
<div class="lab">
  <Editor />
  <Viewer />
</div>
</template>