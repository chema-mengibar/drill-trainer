<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 364 148`" 
  >




<path fill-rule="evenodd" clip-rule="evenodd" d="M283.717 104L0.997803 104L0.997807 44L283.717 44L283.717 104Z" :fill="c"/>
<path d="M283.717 147.07L283.717 0.930053L363.357 74.0001L283.717 147.07Z" :fill="c"/>



  </svg>
</template>
<script>
export default {
  name: 'IconBase',
  props: {
    w: { type: [Number, String], default: 364 },
    h: {type: [Number, String], default: 148 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>