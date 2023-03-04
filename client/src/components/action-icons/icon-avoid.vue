<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 306 306`" 
  >

  <path :fill="c" fill-rule="evenodd" clip-rule="evenodd" d="M200.403 153L305.554 47.8487L258.252 0.545974L153.1 105.697L47.9486 0.545887L0.645962 47.8486L105.797 153L0.646117 258.151L47.9488 305.454L153.1 200.303L258.251 305.454L305.554 258.151L200.403 153Z" />


  </svg>
</template>
<script>
export default {
  name: 'Back',
  props: {
    w: { type: [Number, String], default: 306 },
    h: {type: [Number, String], default: 306 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>