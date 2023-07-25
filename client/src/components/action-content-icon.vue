<script>
import IconChangeDirection from "./action-icons/icon-change-direction.vue";
import IconPass from "./action-icons/icon-pass.vue";
import IconRun from "./action-icons/icon-run.vue";
import IconShoot from "./action-icons/icon-shoot.vue";
import IconStick from "./action-icons/icon-stick-handling.vue";
import IconStop from "./action-icons/icon-stop-control.vue";
import IconBack from "./action-icons/icon-back.vue";
import IconAvoid from "./action-icons/icon-avoid.vue";

export default {
  inject: ['$services'],
  name: 'IconContentIcon',
  props: {
   icon: { type: String, default: null},
  },
  data: ()=>( {
    t: {}
  }),
  created(){
    this.t = this.$services.localeService.D()
  },
  methods: {
   
  },
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
}
</script>

<style lang="scss">

@import '../styles/media';

.dummy{
  @include desktop {
    //
  }
}


</style>

<template>

          <IconChangeDirection
            v-if="icon === 'change'"
            w="100%"
            h="100%"
          />
          <IconShoot
            v-if="icon === 'shot'"
            w="100%"
            h="100%"
          />
          <IconRun v-if="icon === 'run'" w="100%" h="100%" />
          <IconAvoid
            v-if="icon === 'avoid'"
            w="100%"
            h="100%"
          />
          <IconPass
            v-if="icon === 'pass'"
            w="100%"
            h="100%"
          />
          <IconStick
            v-if="icon === 'stick'"
            w="100%"
            h="100%"
          />
          <IconStop
            v-if="icon === 'control'"
            w="100%"
            h="100%"
          />
          <IconBack
            v-if="icon === 'back'"
            w="100%"
            h="100%"
          />
</template>