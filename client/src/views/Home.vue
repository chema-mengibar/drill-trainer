<script>
export default {
  name: "Home",
  inject: ["$services"],
  data: () => ({
    t: {},
    list: [],
  }),
  methods: {},
  created() {
    const _ = this;
    _.t = this.$services.localeService.D();
  },
  mounted() {
    document.body.style.overflow = "auto";
    this.$services.toolService.fetchSeqs().then((resp) => {
      this.list = resp;
    });
  },
  components: {},
};
</script>

<style  lang="scss">
@import "../styles/media";

.collection {
  display: flex;
  gap: 10px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.thumbnail {
  min-width: 150px;
  min-height: 180px;
  max-width: 25%;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 5px;
  box-sizing: border-box;
  flex: 1;

  &:link,
  &:visited,
  &:hover,
  &:active {
    text-decoration: none;
    color: black;
    font-family: var(--font-hl);
    font-size: 14px;
  }

  img {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="layout-home">
    <div class="collection">
         <router-link
        class="thumbnail"
        :to="{ name: 'Editor'}"
      >
        +
      </router-link>

      <router-link
        :to="{ name: 'Player', query: { id: sequenceItem.id } }"
        v-bind:key="sequenceItem.id"
        class="thumbnail"
        v-for="sequenceItem in list"
      >
        {{ sequenceItem.name }}
        
        <img
          :src="$services.toolService.getImagePath(sequenceItem.drill)"
          :alt="sequenceItem.drill"
          :title="sequenceItem.drill"
          width="300"
          height="300"
        />
      </router-link>

   
    </div>
  </div>
</template>