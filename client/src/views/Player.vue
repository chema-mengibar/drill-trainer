<script>
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";
import IconChangeDirection from "../components/action-icons/icon-change-direction.vue";
import IconPass from "../components/action-icons/icon-pass.vue";
import IconRun from "../components/action-icons/icon-run.vue";
import IconShoot from "../components/action-icons/icon-shoot.vue";
import IconStick from "../components/action-icons/icon-stick-handling.vue";
import IconStop from "../components/action-icons/icon-stop-control.vue";
import IconBack from "../components/action-icons/icon-back.vue";
import { isProxy, toRaw } from 'vue';

export default {
  name: "Player",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined,
    cursor:0,
    timer:0,
    intervalid: 0,
    intervalInit: 0,
    countdown:5,
    countdownDefault:5
  }),
  methods: {
    back:function(){
     
      //this.$router.push('/')

      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    init:function(){
      this.countdown = this.countdownDefault;
      clearInterval(this.intervalInit)
      this.intervalInit = setInterval(() => {
        this.countdown--;
        if(this.countdown <= 0){
          clearInterval(this.intervalInit)
          this.play()
        }
      }, 1000);
    },
    next: function(){
      this.cursor++;
      this.play()
    },
    play: function(){
      clearInterval(this.intervalid)
      const currentFrame = toRaw(this.currentFrame)
      if(currentFrame){
        this.intervalid = setInterval(() => {
          this.next();
        }, currentFrame.duration * 1000);
      }
    }
  },
  created() {
    this.t = this.$services.localeService.D();
  },
  mounted() {
    const _ = this;
    const seqId = this.$route.query.id;
    console.log('>>>', seqId) 
    this.s = this.$services.toolService.getSequenceById(seqId);
    console.log('>>>', this.s)  
    this.cursor = 0;
    // // Auto init
    //this.play()
  },
  computed: {
    currentFrame() {
      if(this.s){
        if(this.cursor < this.s.frames.length ){
          if(Array.isArray( this.s.frames[ this.cursor ])){
            const max = Math.floor(this.s.frames[ this.cursor ].length - 1);
            const min = Math.ceil(0);
            const selectedIdx = Math.floor(Math.random() * (max - min + 1)) + min;
            return this.s.frames[ this.cursor ][selectedIdx]
          }
          return this.s.frames[ this.cursor ]

        }else{
          clearInterval(this.intervalid)
          return this.s.frames[ this.cursor-1 ]
        }
      }
      return null
    }
  },
  components: {
    ButtonAccentBig,
    IconPass,
    IconRun,
    IconShoot,
    IconStick,
    IconChangeDirection,
    IconStop,
    IconBack
  },
};
</script>

<style  lang="scss">
@import "../styles/media";


.countdown{
  position:absolute;
  width:100vw;
  height: 100vh;
  background-color: rgba(0,0,0, .8);
  color: white; 
  text-align:center;
  line-height: 100 vh;
  font-size:100vh;
  font-weight: bolder;
  font-family: var(--font-num);
}

.player{
  display: flex;
  flex-direction: row;
  cursor:pointer;
  position:relative;
}

.action{
  height: 100vh;
  color: white;
  flex: 1;

  &.black{
    background-color:  black;
    color: white;
  }
  
  &.yellow{
    background-color: var(--c-yellow);
    color: black;
  }

  &.blue{
    background-color: var(--c-blue);
  }

  &.green{
    background-color: var(--c-green);
    color: black;
  }

  &.red{
    background-color: var(--c-red);
    color: black;
  }
}

.counter{
  font-family: var(--font-num);
  height: 100vh;
  background-color: rgb(0, 0, 0);
  font-size: 100vh;
  text-align: center;
  font-weight: bolder;
  line-height: 100vh;
  flex: 1;

  &.yellow{
    color: var(--c-yellow);
  }

  &.blue{
    color: var(--c-blue);
  }

  &.green{
    color: var(--c-green);
  }

  &.red{
    color: var(--c-red);
  }
}

.calc{
  height: 100vh;
  font-family: var(--font-num);
  background-color: rgb(0, 0, 0);
  text-align: center;
  font-weight: bolder;
  line-height: 100vh;
  font-size:250px;
  flex: 1;

  &.yellow{
    color: var(--c-yellow);
  }

  &.blue{
    color: var(--c-blue);
  }

  &.green{
    color: var(--c-green);
  }

  &.red{
    color: var(--c-red);
  }
}
</style>

<template>

  <div class="wrapper player" v-on:dblclick="back" v-on:click="init">

    <div v-if="countdown  > 0 " class="countdown">{{countdown}}</div>

    <template  v-if="currentFrame && currentFrame.type==='action'">
      <div class="action" 
        v-bind:key="`${div.color}_${index}`"
        v-for="(div, index) in currentFrame.divs"
        :class="div.color">
          <IconChangeDirection  v-if="currentFrame && div.icon==='change'" w="100%" h="100%"  />
          <IconShoot  v-if="currentFrame && div.icon==='shot'" w="100%" h="100%"  />
          <IconRun  v-if="currentFrame && div.icon==='run'" w="100%" h="100%"  />
          <IconPass  v-if="currentFrame && div.icon==='pass'" w="100%" h="100%"  />
          <IconStick  v-if="currentFrame && div.icon==='stick'" w="100%" h="100%"  />
          <IconStop  v-if="currentFrame && div.icon==='control'" w="100%" h="100%"  />
          <IconBack  v-if="currentFrame && div.icon==='back'" w="100%" h="100%"  />
      </div>
    </template>
  
    <div class="counter" :class="currentFrame.divs[0].color" v-if="currentFrame && currentFrame.type==='counter'">
      {{currentFrame.divs[0].value}}
    </div>

    <div class="calc" :class="currentFrame.divs[0].color" v-if="currentFrame && currentFrame.type==='calc'">
      {{currentFrame.divs[0].value}}
    </div>

  </div>
</template>