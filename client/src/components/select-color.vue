<script>
export default {
  inject: ["$services"],
  name: "SelectType",
  props: {
    initValue: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: () => ({
    options: ["red", "green", "blue", "yellow", 'orange'],
    selected: null,
    open: false,
  }),
  mounted() {
    this.selected = this.initValue;
  },
  created() {
    this.t = this.$services.localeService.D();
  },
};
</script>

<style lang="scss">
@import "../styles/media";

.select-type {
  @include desktop {
    //
  }
}
</style>

<template>
  <select class="custom-select" v-model="selected">
    <option v-for="(option, i) of options" :key="i">
      {{ option }}
    </option>
  </select>
</template>