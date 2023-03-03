<script>
import IconChangeDirection from "../components/action-icons/icon-change-direction.vue";
import IconPass from "../components/action-icons/icon-pass.vue";
import IconRun from "../components/action-icons/icon-run.vue";
import IconShoot from "../components/action-icons/icon-shoot.vue";
import IconStick from "../components/action-icons/icon-stick-handling.vue";
import IconStop from "../components/action-icons/icon-stop-control.vue";
import IconBack from "../components/action-icons/icon-back.vue";

export default {
  name: "Viewer",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined
  }),
  methods: {

  },

  created() {
    this.t = this.$services.localeService.D();
  },

  mounted() {
    const seqId = this.$route.query.id;
     this.s = this.$services.toolService.getSequenceById(seqId);
  },
  computed: {
   
  },
  components: {
        IconPass,
    IconRun,
    IconShoot,
    IconStick,
    IconChangeDirection,
    IconStop,
    IconBack,
  },
};
</script>

<style  lang="scss">
@import "../styles/media";

.viewer{
  position: relative;
  background-color:#bfbfbf;
}

.carrousel{
  width: 90%;
  height: 100vh;
  overflow-x: scroll;
  display: flex;
  gap: 10px;
  top:10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position:absolute;
  align-items: center;
}

.diapo{
  min-width: 190px;
  height: 100px;
  display: flex;
  flex-direction: row;

  &.asColum{
    gap: 10px;
    flex-direction: column;
    height:auto;
  }
}


.mini-action {
  min-height: 100px;
  color: white;
  flex: 1;

  &.black {
    background-color: black;
    color: white;
  }

  &.yellow {
    background-color: var(--c-yellow);
    color: black;
  }

  &.blue {
    background-color: var(--c-blue);
    color: white;
  }

  &.green {
    background-color: var(--c-green);
    color: black;
  }

  &.red {
    background-color: var(--c-red);
    color: white;
  }
}

.mini-counter {
  font-family: var(--font-num);
  min-height: 100px;
  color: black;
  background-color: white;
  font-size: 50px;
  text-align: center;
  font-weight: 400;
  line-height: 100px;
  flex: 1;
}

.mini-calc {
  min-height: 100px;
  font-family: var(--font-num);
  background-color: black;
  text-align: center;
  font-weight: 400;
  line-height: 100px;
  font-size: 50px;
  letter-spacing: 10px;
  flex: 1;

  &.yellow {
    background-color: var(--c-yellow);
    color: black;
  }

  &.blue {
    background-color: var(--c-blue);
    color: white;
  }

  &.green {
    background-color: var(--c-green);
    color: black;
  }

  &.red {
    background-color: var(--c-red);
    color: white;

  }
}

</style>

<template>
  <div class="viewer wrapper">
    <template v-if="s" >
      <div class="carrousel" >

        <div class="diapo" :class="{asColum: Array.isArray(currentFrame)}" v-bind:key="`${currentFrame.type}_${index}`"  
        v-for="(currentFrame, index) in s.frames">


          <template v-if="Array.isArray(currentFrame)">
            <template  v-for="(frame, index) in currentFrame">
            
<!-- start -->
<template v-if="frame && frame.type === 'action'">
              <div
                class="mini-action"
                v-bind:key="`${div.color}_${index}`"
                v-for="(div, index) in frame.divs"
                :class="div.color"
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
              <IconRun v-if="frame && div.icon === 'run'" w="100%" h="100%" />
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
          >
            {{ frame.value }}
          </div>

          <div
            class="mini-calc"
            :class="frame.color"
            v-bind:key="`${frame.color}_${index}`"
            v-if="frame && frame.type === 'calc'"
          >
            {{ frame.value }}
          </div>




            <!--  end -->
            </template>
          </template>


          <template v-if="!Array.isArray(currentFrame)">


            <template v-if="currentFrame && currentFrame.type === 'action'">
              <div
                class="mini-action"
                v-bind:key="`${div.color}_${index}`"
                v-for="(div, index) in currentFrame.divs"
                :class="div.color"
              >
              <IconChangeDirection
                v-if="currentFrame && div.icon === 'change'"
                w="100%"
                h="100%"
              />
              <IconShoot
                v-if="currentFrame && div.icon === 'shot'"
                w="100%"
                h="100%"
              />
              <IconRun v-if="currentFrame && div.icon === 'run'" w="100%" h="100%" />
              <IconPass
                v-if="currentFrame && div.icon === 'pass'"
                w="100%"
                h="100%"
              />
              <IconStick
                v-if="currentFrame && div.icon === 'stick'"
                w="100%"
                h="100%"
              />
              <IconStop
                v-if="currentFrame && div.icon === 'control'"
                w="100%"
                h="100%"
              />
              <IconBack
                v-if="currentFrame && div.icon === 'back'"
                w="100%"
                h="100%"
              />
            </div>
          </template>

          <div
            class="mini-counter"
            v-if="currentFrame && currentFrame.type === 'counter'"
          >
            {{ currentFrame.value }}
          </div>

          <div
            class="mini-calc"
            :class="currentFrame.color"
            v-if="currentFrame && currentFrame.type === 'calc'"
          >
            {{ currentFrame.value }}
          </div>

          
          </template>




        
          



        </div>
      </div>
    </template>
  </div>
</template>