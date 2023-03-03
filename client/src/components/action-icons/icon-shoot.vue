<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 242 308`" 
  >



<path d="M201.733 310.119L163.671 310.119L163.74 119.955L189.487 119.955L120.947 45.353L52.4961 119.955L78.2109 119.955L78.2109 310.045L40.4139 310.045L40.4138 132.006L0.734123 132.006L120.94 0.632655L241.266 132.031L201.733 131.912L201.733 310.119Z" :fill="c"/>


  </svg>
</template>
<script>
export default {
  name: 'IconBase',
  props: {
    w: { type: [Number, String], default: 242 },
    h: {type: [Number, String], default: 308 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>