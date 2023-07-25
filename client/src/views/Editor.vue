<script>
import IconContentIcon from "../components/action-content-icon.vue";
import SelectType from "../components/select-type.vue";
import SelectColor from "../components/select-color.vue";
import SelectAction from "../components/select-action.vue";
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";
import { toRaw } from "vue";

export default {
  name: "FrameEditor",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined,
    status: null,
    showModal: false,
    model: {
      id: "",
      name: "",
      drill: null,
      description: "",
      useLoop: "0",
      useUserInteraction: "1",
      frames: [],
    },
  }),
  methods: {
    setDrill: function (drillname) {
      this.model.drill = drillname;
      this.showModal = false;
    },
    openModalDrill: function () {
      this.showModal = true;
    },
    closeModalDrill: function () {
      this.showModal = false;
    },
    remove: function (event) {
      const position = event.target.getAttribute("data-position"); // before, after, last
      const frameIdx = event.target.getAttribute("data-frame-idx");
      const subFrameIdx = event.target.getAttribute("data-subframe-idx");
      const divIdx = event.target.getAttribute("data-div-idx");

      // console.log(">>>>>", position, frameIdx, subFrameIdx, divIdx);

      if (
        position === "none" &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx !== null
      ) {
        this.$services.toolService.removeDiv({ frameIdx, subFrameIdx, divIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        //console.log("[REMOVE] 1");
        return;
      }

      if (
        position === "none" &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx === null
      ) {
        this.$services.toolService.removeSubFrame({ frameIdx, subFrameIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        //console.log("[REMOVE] 2");
        return;
      }

      if (
        position === "none" &&
        frameIdx !== null &&
        subFrameIdx === null &&
        divIdx === null
      ) {
        this.$services.toolService.removeFrame({ frameIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        //console.log("[REMOVE] 3");
        return;
      }
    },
    add: function (event) {
      const position = event.target.getAttribute("data-position"); // before, after, last
      const frameIdx = event.target.getAttribute("data-frame-idx");
      const subFrameIdx = event.target.getAttribute("data-subframe-idx");
      const divIdx = event.target.getAttribute("data-div-idx");

      //console.log("[ADD] params: ", position, frameIdx, subFrameIdx, divIdx);

      if (
        (position === "before" || position === "last") &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx === null
      ) {
        this.$services.toolService.addSubFrameBefore({ frameIdx, subFrameIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        //console.log("[ADD] 1");
        return;
      }

      if (
        position === "before" &&
        frameIdx === null &&
        subFrameIdx === null &&
        divIdx === null
      ) {
        this.$services.toolService.addFrameBefore();
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        //console.log("[ADD] 2", toRaw(this.s));
        return;
      }

      if (
        (position === "before" || position === "last") &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx !== null
      ) {
        //console.log("[ADD] 3");
        this.$services.toolService.addDiv({ frameIdx, subFrameIdx, divIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        return;
      }

      if (
        position === "after" &&
        frameIdx !== null &&
        subFrameIdx === null &&
        divIdx === null
      ) {
        //console.log("[ADD] 4");
        this.$services.toolService.addFrameAfterIdx({ frameIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        return;
      }
    },
    async submit() {
      const file = null; // this.$refs.drill.files[0];
      this.status = null;
      this.$services.toolService
        .saveSeq(toRaw(this.model), file)
        .then((resp) => {
          this.status = resp.status + " " + resp.statusText;
        });
    },
    back: function () {
      if (this.s) {
        this.$router.push({ path: "/player", query: { id: this.s.id } });
      }
    },
  },
  created() {
    this.t = this.$services.localeService.D();
  },

  mounted() {
    const _ = this;
    const seqId = this.$route.query.id;

    this.$services.toolService.fetchImages().then((resp) => {
      console.log(
        "[EDITOR] images:",
        this.$services.toolService.getImagesAsRaw()
      );
    });

    if (seqId) {
      this.$services.toolService.fetchSeq(seqId).then((resp) => {
        this.s = this.$services.toolService.getSequence();
        this.model.id = this.s.id;
        this.model.name = this.s.name;
        this.model.drill = this.s.drill;
        this.model.description = this.s.description;
        this.model.frames = this.s.frames;
        this.model.useLoop = this.s.useLoop;
        this.model.useUserInteraction = this.s.useUserInteraction;
      });
    } else {
      // create new

      this.s = this.$services.toolService.create();
      this.model.id = this.s.id;
      this.model.name = this.s.name;
      this.model.drill = this.s.drill;
      this.model.description = this.s.description;
      this.model.frames = this.s.frames;
      this.model.useLoop = this.s.useLoop;
      this.model.useUserInteraction = this.s.useUserInteraction;
    }
  },
  computed: {
    currentFrames() {
      if (this.s) {
        return this.s.frames;
      }
      return [];
    },
  },
  components: {
    SelectType,
    SelectColor,
    SelectAction,
    ButtonAccentBig,
    IconContentIcon,
  },
};
</script>

<style  lang="scss">
@import "../styles/media";
@import "../styles/cards";

.controls {
  display: flex;
  padding: 20px;
  gap: 40px;
}

button.submit {
  background-color: var(--ed-button-submit);
  color: var(--ed-button-submit-text);
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
}

.button-back {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.canvas {
  display: flex;
  align-items: center;
  margin-top: 20px;
  transform: scale(0.8);
}

.loop-frames {
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  gap: 10px;
}

.obj-frame {
  background-color: var(--ed-frame-bg);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: var(--ed-frame-color);
  border: 1px solid var(--ed-frame-border);
}

.obj-frame-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.obj-subframe {
  background-color: var(--ed-subframe-bg);
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--ed-subframe-border);
}

.labels-group {
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
}

.subframe-divs-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.subframe-divs-groups {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px 0 0;
  gap: 10px;
}

.obj-div {
  background-color: var(--ed-div-bg);
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  label {
    margin: 10px 10px 2px 0;
  }
}

.obj-div_header {
  display: flex;
  gap: 7px;
}

.miniature-action {
  height: 40px;
  width: 60px;
  @include action-colors;
}

.obj-x-label {
  display: flex;
  flex-direction: column;
  width: 100px;
  margin-bottom: 10px;
  label {
    margin: 10px 0 2px;
  }
}

.add-frame,
.add-subframe,
.add-div {
  padding: 5px;
  margin: 5px 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: var(--ed-button-add-base);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
}

.remove-frame,
.remove-subframe,
.remove-div {
  padding: 5px 5px 10px;
  margin: 5px 0;
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--ed-button-remove);
  background-color: var(--ed-button-remove-base);
  color: var(--ed-button-remove);
  cursor: pointer;
  margin-left: auto;
}

.add-frame {
  border: 1px solid var(--ed-button-add_frame);
  color: var(--ed-button-add_frame);
}

.add-subframe {
  border: 1px solid var(--ed-button-add_subframe);
  color: var(--ed-button-add_subframe);
}

.add-div {
  border: 1px solid var(--ed-button-add_div);
  color: var(--ed-button-add_div);
}

.form-row {
  margin-bottom: 7px;
  label {
    width: 100px;
    display: inline-block;
    margin: 0 20px;
    color: var(--ed-base-text);
  }

  input {
    height: 36px;
    width: 250px;
    font-size: 16px;
    padding: 7px;
    background: rgba(255, 255, 255, 0.5);
    border: none;

    &:focus-visible {
      border: 1px solid white;
      outline: none;
    }

    &:read-only {
      background: rgba(255, 255, 255, 0.267);
    }
  }
}

.drill-modal {
  position: absolute;
  height: 80%;
  width: 80%;
  background-color: rgb(63, 63, 63);
  z-index: 1000;
  color: white;
  top: 20px;
  left: 20px;
  overflow: auto;
  padding: 10px;

  .drill {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    gap: 20px;

    .mini-drill {
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 10px;
      display: flex;
      flex-direction: column;
      height: max-content;
      cursor: pointer;
      img {
        width: 100%;
        height: auto;
        max-width: 150px;
        margin-bottom: 7px;
      }
    }
  }

  .hiddeDrill {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    height: 20px;
    width: 20px;
    color: white;
    cursor: pointer;
    margin-left: auto;
  }
}

.drill-preview{
  height: 120px;
  img {
      
      height: auto;

    }
}
</style>

<template>
  <div class="layout-editor">
    <form @submit.prevent="submit" novalidate enctype="multipart/form-data">
      <div class="controls">
        <div class="button-back" @click="back">Back</div>
        <button type="submit" class="submit">Save - {{ status }}</button>
      </div>


      <div class="form-row">
        <label>Id</label>
        <input v-model="model.id" readonly />
      </div>
      <div class="form-row">
        <label>Name</label>
        <input v-model="model.name" />
      </div>
      <div class="form-row">
        <label>Drill</label>
        <input v-on:click="openModalDrill" readonly v-model="model.drill" />
        <div class="drill-preview">
          <img
            :title="model.drill"
            :alt="model.drill"
            :src="$services.toolService.getImagePath(model.drill)"
          />
        </div>
      </div>
      <div class="form-row">
        <label>Description</label>
        <input v-model="model.description" />
      </div>
      <div class="form-row">
        <label>Loop?</label>
        <select v-model="model.useLoop">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>
      <div class="form-row">
        <label>Interaction?</label>
        <select v-model="model.useUserInteraction">
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <div v-if="s" class="canvas">
        <button
          type="button"
          class="add-frame"
          data-position="before"
          :data-frame-idx="null"
          :data-subframe-idx="null"
          v-on:click="add($event)"
        >
          +
        </button>

        <div
          class="loop-frames"
          v-bind:key="`${frame.id}`"
          v-for="(frame, indF) in currentFrames"
        >
          <div class="obj-frame">
            <button
              type="button"
              class="remove-frame"
              v-on:click="remove($event)"
              data-position="none"
              :data-frame-idx="indF"
            >
              x
            </button>
            <div
              class="obj-frame-child"
              v-for="(subframe, indSf) in frame"
              v-bind:key="`${subframe.id}`"
            >
              <button
                type="button"
                class="add-subframe"
                data-position="before"
                :data-frame-idx="indF"
                :data-subframe-idx="indSf"
                v-on:click="add($event)"
              >
                +
              </button>

              <div data-debug="ACTION-COLUMN" class="obj-subframe">
                <button
                  type="button"
                  class="remove-subframe"
                  v-on:click="remove($event)"
                  data-position="none"
                  :data-frame-idx="indF"
                  :data-subframe-idx="indSf"
                >
                  x
                </button>

                <div class="labels-group">
                  <div class="obj-x-label" v-if="model.frames[indF]?.[indSf]">
                    <label :data-value="subframe.type">Type</label>
                    <SelectType
                      v-model="model.frames[indF][indSf].type"
                      :initValue="model.frames[indF][indSf].type"
                    />
                  </div>
                  <div class="obj-x-label" v-if="model.frames[indF]?.[indSf]">
                    <label
                      :data-value="subframe.duration"
                      class="obj-x-duration"
                    >
                      Duration
                    </label>
                    <input v-model="model.frames[indF][indSf].duration" />
                  </div>

                  <div
                    class="obj-x-label"
                    v-if="
                      subframe.type === 'counter' || subframe.type === 'calc'
                    "
                  >
                    <label
                      class="obj-x-value"
                      v-if="model.frames[indF]?.[indSf]"
                    >
                      Value {{ subframe.value }}:
                    </label>
                    <input v-model="model.frames[indF][indSf].value" />
                  </div>
                </div>

                <div
                  v-if="subframe.type === 'action'"
                  class="subframe-divs-container"
                >
                  <!-- B:start-->
                  <div
                    class="subframe-divs-groups"
                    v-for="(div, indD) in subframe.divs"
                    v-bind:key="`${div.id}`"
                  >
                    <div
                      class="add-div"
                      data-position="before"
                      :data-frame-idx="indF"
                      :data-subframe-idx="indSf"
                      :data-div-idx="indD"
                      v-on:click="add($event)"
                    >
                      +
                    </div>

                    <div
                      class="obj-div"
                      data-debug="ACTION-FRAME"
                      :data-frame-idx="indF"
                      :data-subframe-idx="indSf"
                      :data-div-idx="indD"
                    >
                      <div class="obj-div_header">
                        <div
                          class="miniature-action"
                          v-if="model.frames[indF]?.[indSf]?.divs?.[indD]"
                          v-bind:class="
                            model.frames[indF][indSf].divs[indD].color
                          "
                        >
                          <IconContentIcon v-bind:icon="div.icon" />
                        </div>

                        <button
                          type="button"
                          class="remove-div"
                          v-on:click="remove($event)"
                          data-position="none"
                          :data-frame-idx="indF"
                          :data-subframe-idx="indSf"
                          :data-div-idx="indD"
                        >
                          x
                        </button>
                      </div>

                      <label :data-value="div.color">Color</label>
                      <SelectColor
                        v-if="model.frames[indF]?.[indSf]?.divs?.[indD]"
                        v-model="model.frames[indF][indSf].divs[indD].color"
                        :initValue="model.frames[indF][indSf].divs[indD].color"
                      />
                      <label :data-value="div.icon">Icon</label>
                      <SelectAction
                        v-if="model.frames[indF]?.[indSf]?.divs?.[indD]"
                        v-model="model.frames[indF][indSf].divs[indD].icon"
                        :initValue="model.frames[indF][indSf].divs[indD].icon"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    class="add-div"
                    v-on:click="add($event)"
                    data-position="last"
                    :data-frame-idx="indF"
                    :data-subframe-idx="indSf"
                    :data-div-idx="subframe.divs.length"
                  >
                    +
                  </button>
                  <!-- B: end-->
                </div>
              </div>
            </div>

            <button
              type="button"
              class="add-subframe"
              data-position="last"
              :data-frame-idx="indF"
              :data-subframe-idx="frame.length"
              v-on:click="add($event)"
            >
              +
            </button>
          </div>
          <button
            type="button"
            class="add-frame"
            data-position="after"
            :data-frame-idx="currentFrames.length"
            v-on:click="add($event)"
          >
            +
          </button>
        </div>
      </div>
    </form>

    <div class="drill-modal" v-if="showModal">
      <div class="hiddeDrill" @click="closeModalDrill">X</div>
      <div class="drill" v-if="$services.toolService.getImages().length > 0">
        <div
          class="mini-drill"
          v-on:click="setDrill(img)"
          v-for="(img, i) of $services.toolService.getImagesAsRaw()"
          :key="i"
        >
          <img
            :title="img"
            :alt="img"
            :src="$services.toolService.getImagePath(img)"
          />
          <span>{{ img }}</span>
        </div>
      </div>
    </div>
  </div>
</template>