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
    cursor: 0,
    timer: 0,
    intervalFlowId: 0,
    intervalInit: 0,
    countdown: 10,
    countdownDefault: 10,
    flow: 'ready',
    useCountdown: true
  }),
  methods: {
    player: function(){
      if(this.flow === 'ready'){
        this.init();
      }
      else if(this.flow === 'running'){
        this.pause();
      }
      else if(this.flow === 'paused'){
        this.play();
      }
    },
    fullScreen: function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    back: function () {
      this.$router.push("/");
    },
    viewer: function () {
      this.$router.push({ path: '/viewer', query: { id: this.s.id } })
    },
    init: function () {
      this.cursor = 0;
      this.countdown = this.countdownDefault;
      clearInterval(this.intervalInit);
      if(this.useCountdown){
        this.intervalInit = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
              clearInterval(this.intervalInit);
              this.play();
            }
          }, 1000);
      }else{

        this.play();
      }
    },
    next: function () {
      if(this.cursor < this.s.frames.length - 1){
        this.cursor++;
      }
      else{
        this.flow = 'ready'
        clearInterval(this.intervalFlowId);
      }
    },
    play: function () {
      this.flow = 'running'
      clearInterval(this.intervalFlowId);
      const currentFrame = toRaw(this.currentFrame);
      if (currentFrame) {
        this.intervalFlowId = setInterval(() => {
          this.next();
        }, currentFrame.duration * 1000);
      }
    },
    staticNext: function () {
      clearInterval(this.intervalFlowId);
      this.flow = 'paused'
       if(this.cursor < this.s.frames.length - 1){
        this.cursor++;
      }
    },
    staticPrev: function () {
      clearInterval(this.intervalFlowId);
       this.flow = 'paused'
      if(this.cursor < 1  ){
        return
      }
      this.cursor--;
    },
    pause: function () {
      this.flow = 'paused'
      clearInterval(this.intervalFlowId);
     }
  },
  created() {
    this.t = this.$services.localeService.D();
  },
  mounted() {
    const seqId = this.$route.query.id;
    this.s = this.$services.toolService.getSequenceById(seqId);
    console.log("[Player] mounted:", seqId, toRaw(this.s));
    this.cursor = 0;
    //this.fullScreen()
  },
  computed: {
    currentFrame() {
      if (this.s) {
        if (this.cursor < this.s.frames.length) {
          if (Array.isArray(this.s.frames[this.cursor])) {
            const max = Math.floor(this.s.frames[this.cursor].length - 1);
            const min = Math.ceil(0);
            const selectedIdx =
              Math.floor(Math.random() * (max - min + 1)) + min;
            return this.s.frames[this.cursor][selectedIdx];
          }
        } 
        return this.s.frames[this.cursor];
      }
      return null;
    },
  },
  components: {
    ButtonAccentBig,
    IconPass,
    IconRun,
    IconShoot,
    IconStick,
    IconChangeDirection,
    IconStop,
    IconBack,
    IconAvoid,
    Spinner
  },
};
</script>

<style  lang="scss">
@import "../styles/media";


.flow{
  display: flex;
  align-items:center;
  gap: 10px;
}

.countdown {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  text-align: center;
  line-height: 100vh;
  font-size: 100vh;
  font-weight: 400;
  font-family: var(--font-num);
}

.display {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;

  .display_header {
    display:flex;
    height: 50px;
    gap:5px;

    .button{
      display: flex;
      justify-content: center;
      align-items:center;
      font-size: 20px;
      color: rgba(0,0,0, 0.5);
      font-weight: 700;
      border: 1px dotted rgba(255,255,255, .7);
      cursor:pointer;
    }

    .header_back-button {
      height:100%;
      width: 7%;
    }
    .header_info {
      flex:1;
      display: flex;;
       justify-content: space-between;
      align-items:center;
      padding: 0 20px;

    }
    .header_view-button {
     width: 7%;
    }
  }

  .display_control {

    display:flex;
    flex:1;

    .control_left-area {
      flex:1;
      border-right: 1px dotted rgba(255,255,255, .7);
    }
    .control_center-area {
      width:60%;
    }
    .control_right-area {

      border-left: 1px dotted rgba(255,255,255, .7);
      flex:1;
    }
  }
}

.player {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  position: relative;
}

.action {
  height: 100vh;
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

.counter {
  font-family: var(--font-num);
  height: 100vh;
  color: black;
  background-color: white;
  font-size: 100vh;
  text-align: center;
  font-weight: 400;
  line-height: 100vh;
  flex: 1;
}

.calc {
  height: 100vh;
  font-family: var(--font-num);
  background-color: black;
  text-align: center;
  font-weight: 400;
  line-height: 100vh;
  font-size: 250px;
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
  <div class="wrapper player">
    <div v-if="countdown > 0 && useCountdown" class="countdown">{{ countdown }}</div>

    <div class="display">
      <div class="display_header">
        <div class="header_back-button button" @click="back">B</div>
        <div v-if="s" class="header_info">
          <div class="flow">
            {{this.flow}} 
            <Spinner v-if="flow == 'running'" />  
          </div>
          <div>({{cursor}}) {{cursor+1}} of {{s.frames.length}}</div>
          <div>dur. {{currentFrame.duration}}</div>
            
        </div>
        <div class="header_view-button button"  @click="fullScreen">F</div>
        <div class="header_view-button button"  @click="viewer">V</div>
      </div>
      <div class="display_control">
        <div class="control_left-area" v-on:click="staticPrev"></div>
        <div class="control_center-area" v-on:dblclick="init" v-on:click="player"></div>
        <div class="control_right-area" v-on:click="staticNext"></div>
      </div>
    </div>

    <template v-if="currentFrame && currentFrame.type === 'action'">
      <div
        class="action"
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
        <IconAvoid v-if="currentFrame && div.icon === 'avoid'" w="100%" h="100%" />
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
      class="counter"
      v-if="currentFrame && currentFrame.type === 'counter'"
    >
      {{ currentFrame.value }}
    </div>

    <div
      class="calc"
      :class="currentFrame.color"
      v-if="currentFrame && currentFrame.type === 'calc'"
    >
      {{ currentFrame.value }}
    </div>
  </div>
</template>