<script>
import IconChangeDirection from "../components/action-icons/icon-change-direction.vue";
import IconPass from "../components/action-icons/icon-pass.vue";
import IconRun from "../components/action-icons/icon-run.vue";
import IconShoot from "../components/action-icons/icon-shoot.vue";
import IconStick from "../components/action-icons/icon-stick-handling.vue";
import IconStop from "../components/action-icons/icon-stop-control.vue";
import IconBack from "../components/action-icons/icon-back.vue";
import IconAvoid from "../components/action-icons/icon-avoid.vue";

export default {
  name: "Viewer",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined,
    isShowDrill: false,
  }),
  methods: {
    fullScreen: function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    back: function () {
      this.$router.push({ path: "/player", query: { id: this.s.id } });
    },
    edit: function () {
      this.$router.push({ path: "/editor", query: { id: this.s.id } });
    },
    showDrill: function () {
      this.isShowDrill = true;
    },
    hiddeDrill: function () {
      this.isShowDrill = false;
    },
  },

  created() {
    this.t = this.$services.localeService.D();
  },

  mounted() {
    const seqId = this.$route.query.id;

    this.$services.toolService.fetchSeq(seqId).then((resp) => {
      this.s = resp;
    });
  },
  computed: {},
  components: {
    IconPass,
    IconRun,
    IconShoot,
    IconStick,
    IconChangeDirection,
    IconStop,
    IconBack,
    IconAvoid,
  },
};
</script>

<style  lang="scss">
@import "../styles/media";
@import "../styles/cards";

.drill-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 10px;
  justify-content: start;
}

.drill-info {
  color: white;
  margin-left: 20px;
}

.hiddeDrill {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
  border: 1px dotted rgba(255, 255, 255, 0.7);
  height: 50px;
  width: 50px;
  color: white;
  cursor: pointer;
  margin-left: auto;
}

.viewer {
  position: relative;
  background-color: #bfbfbf;
}

.carrousel {
  width: 90%;
  height: 100vh;
  overflow-x: scroll;
  display: flex;
  gap: 10px;
  top: 10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  align-items: center;
}

.diapo {
  width: 190px;
  height: 100px;
  display: flex;
  flex-direction: row;
  position: relative;

  &.asColum {
    flex-wrap: wrap;
    //flex-direction: column;
    height: auto;
  }
}

.diapo-info {
  position: absolute;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
}

.mini-action {
  height: 100px;
  width: 190px;
  @include action-colors;
}

.mini-counter {
  font-family: var(--font-num);
  min-height: 100px;
  font-size: 50px;
  text-align: center;
  font-weight: 400;
  line-height: 100px;
  flex: 1;
  @include counter-colors;
}

.mini-calc {
  min-height: 100px;
  font-family: var(--font-num);
  text-align: center;
  font-weight: 400;
  line-height: 100px;
  font-size: 50px;
  letter-spacing: 10px;
  flex: 1;
  @include calc-colors;
}

.size-2 {
  width: calc(190px / 2);
  margin-bottom: 5px;
}

.size-1 {
  width: 190px;
  margin-bottom: 5px;
}

.display {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;

  .display_header {
    display: flex;
    height: 50px;
    gap: 5px;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
      font-weight: 700;
      border: 1px dotted rgba(255, 255, 255, 0.7);
      cursor: pointer;
    }

    .header_back-button {
      height: 100%;
      width: 7%;
    }
    .header_info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    .header_view-button {
      width: 7%;
    }
  }
}
</style>

<template>
  <div class="viewer wrapper">
    <template v-if="s">
      <div class="carrousel">
        <div
          class="diapo"
          :class="{ asColum: currentFrame.length > 1 }"
          v-bind:key="`${currentFrame.type}_${index}`"
          v-for="(currentFrame, index) in s.frames"
        >
          <div class="diapo-info">{{ currentFrame[0].duration }} seg.</div>

            <template v-for="(frame, index) in currentFrame">
              <!-- start -->
              <template v-if="frame && frame.type === 'action'">
                <div
                  class="mini-action"
                  v-bind:key="`${div.color}_${index}`"
                  v-for="(div, index) in frame.divs"
                  :class="`${div.color} size-${frame.divs.length}`"
                >
                  <IconChangeDirection
                    v-if="frame && div.icon === 'change'"
                    w="100%"
                    h="100%"
                  />
                  <IconShoot
                    v-if="frame && div.icon === 'shot'"
                    w="100%"
                    h="100%"
                  />
                  <IconRun
                    v-if="frame && div.icon === 'run'"
                    w="100%"
                    h="100%"
                  />
                  <IconAvoid
                    v-if="currentFrame && div.icon === 'avoid'"
                    w="100%"
                    h="100%"
                  />
                  <IconPass
                    v-if="frame && div.icon === 'pass'"
                    w="100%"
                    h="100%"
                  />
                  <IconStick
                    v-if="frame && div.icon === 'stick'"
                    w="100%"
                    h="100%"
                  />
                  <IconStop
                    v-if="frame && div.icon === 'control'"
                    w="100%"
                    h="100%"
                  />
                  <IconBack
                    v-if="frame && div.icon === 'back'"
                    w="100%"
                    h="100%"
                  />
                </div>
              </template>

              <div
                class="mini-counter"
                v-bind:key="`${frame.color}_${index}`"
                v-if="frame && frame.type === 'counter'"
                :class="`size-${frame.divs.length}`"
              >
                {{ frame.value }}
              </div>

              <div
                class="mini-calc"
                :class="`${frame.color} size-${frame.divs.length}`"
                v-bind:key="`${frame.color}_${index}`"
                v-if="frame && frame.type === 'calc'"
              >
                {{ frame.value }}
              </div>

              <!--  end -->
            </template>



        </div>
      </div>
    </template>

    <div class="display">
      <div class="display_header">
        <div class="header_back-button button" @click="back">B</div>
        <div class="header_view-button button" @click="fullScreen">F</div>
        <div class="header_view-button button" @click="edit">E</div>
        <div class="header_view-button button" @click="showDrill">Drill</div>
      </div>
    </div>

    <div v-if="isShowDrill" class="drill-container">
      <img :src="$services.toolService.getImagePath(s.drill)" />
      <div class="drill-info">
        {{ s.id }}
        <br />
        <h1>{{ s.name }}</h1>
        <p>{{ s.description }}</p>
      </div>
      <div class="hiddeDrill" @click="hiddeDrill">X</div>
    </div>
  </div>
</template>