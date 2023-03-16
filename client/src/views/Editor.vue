<script>
import SelectType from "../components/select-type.vue";
import SelectColor from "../components/select-color.vue";
import SelectAction from "../components/select-action.vue";
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";
import { watchEffect, ref, defineComponent, isProxy, toRaw } from "vue";

export default {
  name: "FrameEditor",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined,
    status: null,
    model: {
      id: "",
      name: "",
      drill: null,
      description: "",
      frames: [],
    },
  }),
  methods: {
    remove: function (event) {
      const position = event.target.getAttribute("data-position"); // before, after, last
      const frameIdx = event.target.getAttribute("data-frame-idx");
      const subFrameIdx = event.target.getAttribute("data-subframe-idx");
      const divIdx = event.target.getAttribute("data-div-idx");

      console.log(">>>>>", position, frameIdx, subFrameIdx, divIdx);

      if (
        position === "none" &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx !== null
      ) {
        this.$services.toolService.removeDiv({ frameIdx, subFrameIdx, divIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        console.log("[REMOVE] 1");
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
        console.log("[REMOVE] 2");
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
        console.log("[REMOVE] 3");
        return;
      }
    },
    add: function (event) {
      const position = event.target.getAttribute("data-position"); // before, after, last
      const frameIdx = event.target.getAttribute("data-frame-idx");
      const subFrameIdx = event.target.getAttribute("data-subframe-idx");
      const divIdx = event.target.getAttribute("data-div-idx");

      console.log("[ADD] params: ", position, frameIdx, subFrameIdx, divIdx);

      if (
        (position === "before" || position === "last") &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx === null
      ) {
        this.$services.toolService.addSubFrameBefore({ frameIdx, subFrameIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        console.log("[ADD] 1");
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
        console.log("[ADD] 2", toRaw(this.s));
        return;
      }

      if (
        (position === "before" || position === "last") &&
        frameIdx !== null &&
        subFrameIdx !== null &&
        divIdx !== null
      ) {
        console.log("[ADD] 3");
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
        console.log("[ADD] 4");
        this.$services.toolService.addFrameAfterIdx({ frameIdx });
        this.s = this.$services.toolService.getSequence();
        this.model.frames = this.s.frames;
        return;
      }
    },
    async submit() {
      var fd = new FormData();
      fd.append("drill", this.$refs.file.files[0]);
      fd.append("id", this.model.id);
      fd.append("name", this.model.name);
      fd.append("frames", this.model.frames);
      fd.append("description", this.model.description);

      console.log(fd);

      this.$services.toolService.saveSeq(toRaw(this.model)).then((resp) => {
        this.status = resp.status + " " + resp.statusText;
      });
    },
  },
  created() {
    this.t = this.$services.localeService.D();
  },

  mounted() {
    const _ = this;
    const seqId = this.$route.query.id;

    if (seqId) {
      this.$services.toolService.fetchSeq(seqId).then((resp) => {
        this.s = this.$services.toolService.getSequence();
        this.model.id = this.s.id;
        this.model.name = this.s.name;
        this.model.drill = this.s.drill;
        this.model.description = this.s.description;
        this.model.frames = this.s.frames;
      });
    }else{
      // create new

      this.s = this.$services.toolService.create();
      this.model.id = this.s.id;
        this.model.name = this.s.name;
        this.model.drill = this.s.drill;
        this.model.description = this.s.description;
        this.model.frames = this.s.frames;
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
  },
};
</script>

<style  lang="scss">
@import "../styles/media";

.canvas {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
  border-radius:8px;
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
  border-radius:6px;
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
border-radius:4px;
  label {
    margin: 10px 10px 2px;
  }
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

button.submit {
  background-color: var(--ed-button-submit);
  color: var(--ed-button-submit-text);
  padding: 20px;
  margin: 20px;
  border-radius:8px;
}

.frame-editor {
  flex: 1;
  overflow: auto;
  background-color: var(--ed-base);
  color: var(--ed-base-text);
}

.status {
  background-color: grey;
  color: white;
  padding: 20px;
  width: 100px;
  margin-bottom: 20px;
}

.form-row{
  margin-bottom:7px;
  label{
    width:100px;
    display:inline-block;
    margin:0 20px;
  }

  input {
    height: 36px;
    font-size: 16px;
    padding:7px;
  }
}
</style>

<template>
  <div class="frame-editor">
    <div v-if="status" class="status">{{ status }}</div>

    <form @submit.prevent="submit" novalidate>
      <button type="submit" class="submit">Save</button>

      <div class="form-row">
        <label>Id</label>
        <input v-model="model.id" />
      </div>
      <div class="form-row">
        <label>Name</label>
        <input v-model="model.name" />
      </div>
      <div class="form-row">
        <label>Drill</label>
        <input type="file" id="file" ref="file" />
      </div>
      <div class="form-row">
        <label>Description</label>
        <input v-model="model.description" />
      </div>

      <div v-if="s" class="canvas">
        <button type="button"
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
            <button type="button"
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
              <button type="button"
                class="add-subframe"
                data-position="before"
                :data-frame-idx="indF"
                :data-subframe-idx="indSf"
                v-on:click="add($event)"
              >
                +
              </button>

              <div class="obj-subframe">
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
                    <label>Type: {{ subframe.type }}</label>
                    <SelectType
                      v-model="model.frames[indF][indSf].type"
                      :initValue="model.frames[indF][indSf].type"
                    />
                  </div>
                  <div class="obj-x-label" v-if="model.frames[indF]?.[indSf]">
                    <label class="obj-x-duration">
                      Duration {{ subframe.duration }}:
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
                      :data-frame-idx="indF"
                      :data-subframe-idx="indSf"
                      :data-div-idx="indD"
                    >
                      <button type="button"
                        class="remove-div"
                        v-on:click="remove($event)"
                        data-position="none"
                        :data-frame-idx="indF"
                        :data-subframe-idx="indSf"
                        :data-div-idx="indD"
                      >
                        x
                      </button>

                      <label>Color: {{ div.color }}</label>
                      <SelectColor
                        v-if="model.frames[indF]?.[indSf]?.divs?.[indD]"
                        v-model="model.frames[indF][indSf].divs[indD].color"
                        :initValue="model.frames[indF][indSf].divs[indD].color"
                      />
                      <label>Icon: {{ div.icon }}</label>
                      <SelectAction
                        v-if="model.frames[indF]?.[indSf]?.divs?.[indD]"
                        v-model="model.frames[indF][indSf].divs[indD].icon"
                        :initValue="model.frames[indF][indSf].divs[indD].icon"
                      />
                    </div>
                  </div>
                  <button type="button"
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

            <button type="button"
              class="add-subframe"
              data-position="last"
              :data-frame-idx="indF"
              :data-subframe-idx="frame.length"
              v-on:click="add($event)"
            >
              +
            </button>
          </div>
          <button type="button"
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
  </div>
</template>