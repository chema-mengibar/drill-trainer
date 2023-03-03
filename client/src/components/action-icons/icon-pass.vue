<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :class="$options.name"
    :width="w" 
    :height="h" 
    :viewBox="`0 0 364 148`" 
  >

<path fill-rule="evenodd" clip-rule="evenodd" d="M252.114 43.8793L283.603 43.8793L283.603 0.885434L363.323 74.0414L283.456 147.197L283.456 104.056L252.114 104.056L252.114 43.8793ZM220.645 43.8715L157.689 43.8715L157.689 104.217L220.645 104.218L220.645 43.8715ZM63.2639 43.8715L126.22 43.8715L126.22 104.217L63.2639 104.218L63.2639 43.8715ZM31.7949 43.8715L0.834471 43.8715L0.834468 104.217L31.7949 104.217L31.7949 43.8715Z"  :fill="c"/>


  </svg>
</template>
<script>
export default {
  name: 'Pass',
  props: {
    w: { type: [Number, String], default: 364 },
    h: {type: [Number, String], default: 148 },
    c: {type: String, default: 'currentColor'}
  }
}
</script>