<script>
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";
import IconChangeDirection from "../components/action-icons/icon-change-direction.vue";
import IconPass from "../components/action-icons/icon-pass.vue";
import IconRun from "../components/action-icons/icon-run.vue";
import IconShoot from "../components/action-icons/icon-shoot.vue";
import IconStick from "../components/action-icons/icon-stick-handling.vue";
import IconStop from "../components/action-icons/icon-stop-control.vue";
import IconBack from "../components/action-icons/icon-back.vue";
import IconAvoid from "../components/action-icons/icon-avoid.vue";
import Spinner from "../components/spinner.vue";
import { isProxy, toRaw } from "vue";

export default {
  name: "Player",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined,
    debug: "",
    event: null,
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/54/Yawning_kitten.ogv/Yawning_kitten.ogv.480p.vp9.webm",
  }),
  methods: {
    log: function (t) {
      this.debug += "> " + t + " \n\r";
    },
    audio: function (t) {
      const _ = this;
      _.log("audo called");
    },
  },

  created() {
    this.t = this.$services.localeService.D();
  },
  mounted() {
    const _ = this;

    document.addEventListener("keydown", function (event) {
      _.event = event.key; // keyCode
      //176 MediaTrackNext
      //179 MediaPlayPause
      //177 MediaTrackPrevious
    });

    _.log("START");

    
  },
  computed: {},
  components: {},
};
</script>

<style  lang="scss">
@import "../styles/media";
@import "../styles/cards";

.frame-wrapper {
  display: flex;
  width: 100vw;
  flex-direction: column;
}

audio {
  display:none;
}

.button-blue {
  flex: 1;
  min-height: 150px;
  background-color: blue;
  color: white;
  margin: 10px;
}

.debug {
  white-space: pre-wrap;
}
</style>

<template>
  <div class="frame-wrapper">
    <button id="blue" class="button-blue" v-on:click="add()">Blue</button>

   

    <div>event: {{ event }}</div>
    <pre class="debug">{{ debug }}</pre>
  </div>
</template>