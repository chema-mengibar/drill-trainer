<script>
import SelectType from "../components/select-type.vue";
import SelectColor from "../components/select-color.vue";
import SelectAction from "../components/select-action.vue";
import ButtonAccentBig from "../components/buttons/button-accent-big.vue";
import { isProxy, toRaw } from "vue";

export default {
  name: "FrameEditor",
  inject: ["$services"],
  data: () => ({
    t: {},
    s: undefined,
    model: {
      id: "",
      name: "",
      drill: "",
      description: "",
      frames: [],
      test: "action",
    },
  }),
  methods: {
    add: function (event) {
      const position = event.target.getAttribute("data-position"); // before, after, last
      const frameIdx = event.target.getAttribute("data-frame-idx");
      const subFrameIdx = event.target.getAttribute("data-subframe-idx");
      const divIdx = event.target.getAttribute("data-div-idx");

      console.log(">>>>>", position, frameIdx, subFrameIdx, divIdx);

      if (
        position === "before" &&
        frameIdx === null &&
        subFrameIdx === null &&
        divIdx === null
      ) {
        // add at first position of frames
        console.log("add at 0 frame");
      } else if (
        position === "after" &&
        frameIdx !== null &&
        subFrameIdx === null &&
        divIdx === null
      ) {
        // add at
        console.log("add at ");
        const item = {
          type: "action",
          divs: [
            {
              color: "red",
              icon: "shot",
            },
          ],
          duration: 5,
        };
        this.model.frames.splice(frameIdx, 0, item);
      }
    },

    async submit() {
      console.log('>>>>>>>>>>>>>>>>>>>>>>')
      this.$services.toolService.saveSeq(toRaw(this.model));
    },
  },

  created() {
    this.t = this.$services.localeService.D();
  },

  mounted() {
    const _ = this;

    const useDemoData = true;

    const seqId = this.$route.query.id;
    this.$services.toolService.fetchSeq(seqId, useDemoData).then((resp) => {
      this.s = resp;
      console.log(resp);
      this.model.id = this.s.id;
      this.model.name = this.s.name;
      this.model.drill = this.s.drill;
      this.model.description = this.s.description;
      this.model.frames = this.s.frames;
    });
  },
  computed: {},
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

.add-frame,
.add-subframe,
.add-div {
  padding: 5px;
  margin: 5px 0;
  width: 200px;
  border-radius: 10px;
  text-align: center;
  line-height: 12px;
  height: 24px;
  cursor: pointer;
}

.add-frame {
  border: 1px solid rgb(110, 0, 124);
  color: rgb(110, 0, 124);
}

.add-subframe {
  border: 1px solid rgb(255, 5, 59);
  color: rgb(255, 5, 59);
}

.add-div {
  border: 1px solid rgb(0, 189, 79);
  color: rgb(0, 189, 79);
}

.obj-frame {
  border: 2px solid black;
  padding: 10px;
}

.obj-subframe {
  border: 1px dashed black;
  padding: 10px;
}

.subframe-divs-container {
  display: flex;
  flex-direction: row;
}

.subframe-divs-groups {
  display: flex;
  flex-direction: row;
}

.obj-div {
  border: 1px dotted black;
  padding: 10px;
  display: flex;
  flex-direction: column;

  label {
    margin: 10px 0 2px;
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

button {
  background-color: black;
  color: white;
  padding: 20px;
  margin: 20px;
}
</style>

<template>
  <div class="frame-editor wrapper">
    <form @submit.prevent="submit" novalidate>
      <button type="submit">Save</button>

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
        <input v-model="model.drill" />
      </div>
      <div class="form-row">
        <label>Description</label>
        <input v-model="model.description" />
      </div>

      Frames:
      <div v-if="s">
        <div
          class="add-frame"
          data-position="before"
          :data-frame-idx="indF"
          :data-subframe-idx="indSf"
          v-on:click="add($event)"
        >
          Add Frame (Before)
        </div>

        <div
          class="loop-frames"
          v-bind:key="`frame_${frame.color}_${indF}`"
          v-for="(frame, indF) in s.frames"
        >
          <div class="obj-frame">
            <template v-if="Array.isArray(frame)">
              <div
                v-for="(subframe, indSf) in frame"
                v-bind:key="`${subframe.color}_${indSf}`"
              >
                <div
                  class="add-subframe"
                  data-position="after"
                  :data-frame-idx="indF"
                  :data-subframe-idx="indSf"
                  v-on:click="add($event)"
                >
                  Add Sub frame (Before {{ indSf }})
                </div>

                <div class="obj-subframe">
                  <div class="obj-x-label">
                    <label>Type: {{ subframe.type }}</label>
                    <SelectType
                      v-model="model.frames[indF][indSf].type"
                      :initValue="model.frames[indF][indSf].type"
                    />
                  </div>

                  <div
                    v-if="
                      subframe.type === 'counter' || subframe.type === 'calc'
                    "
                  >
                    Value: {{ subframe.value }}
                    <input v-model="model.frames[indF][indSf].value" />
                  </div>

                  <div
                    v-if="subframe.type === 'action'"
                    class="subframe-divs-container"
                  >
                    <!-- B:start-->
                    <div
                      class="subframe-divs-groups"
                      v-for="(div, indD) in subframe.divs"
                      v-bind:key="`div_${indF}_${indSf}_${indD}`"
                    >
                      <div
                        class="add-div"
                        data-position="before"
                        :data-frame-idx="indF"
                        :data-subframe-idx="indSf"
                        :data-div-idx="indD"
                        v-on:click="add($event)"
                      >
                        Add Div (Before {{ indD }})
                      </div>

                      <div
                        class="obj-div"
                        :data-frame-idx="indF"
                        :data-subframe-idx="indSf"
                        :data-div-idx="indD"
                      >
                        <label>Color: {{ div.color }}</label>
                        <SelectColor
                          v-model="model.frames[indF][indSf].divs[indD].color"
                          :initValue="
                            model.frames[indF][indSf].divs[indD].color
                          "
                        />
                        <label>Icon: {{ div.icon }}</label>
                        <SelectAction
                          v-model="model.frames[indF][indSf].divs[indD].icon"
                          :initValue="model.frames[indF][indSf].divs[indD].icon"
                        />
                      </div>
                    </div>
                    <div
                      class="add-div"
                      v-on:click="add($event)"
                      data-position="last"
                      :data-frame-idx="indF"
                      :data-subframe-idx="indSf"
                      :data-div-idx="subframe.divs.length"
                    >
                      Add Div (At {{ subframe.divs.length }})
                    </div>
                    <!-- B: end-->
                  </div>

                  <div class="obj-x-label">
                    <label class="obj-x-duration">
                      Duration {{ subframe.duration }}:
                    </label>
                    <input v-model="model.frames[indF][indSf].duration" />
                  </div>
                </div>
              </div>

              <div
                class="add-subframe"
                data-position="last"
                :data-frame-idx="indF"
                :data-subframe-idx="frame.length"
                v-on:click="add($event)"
              >
                Add Sub frame (At Last {{ frame.length }})
              </div>
            </template>
            <template v-if="!Array.isArray(frame)">
              <div class="obj-x-label">
                <label>Type: {{ frame.type }}</label>

                <SelectType
                  v-model="model.frames[indF].type"
                  :initValue="model.frames[indF].type"
                />
              </div>
              <!-- same as subframe Block-->
              <div v-if="frame.type === 'counter' || frame.type === 'calc'">
                Value: {{ frame.value }}
                <input v-model="model.frames[indF].value" />
              </div>
              <div
                v-if="frame.type === 'action'"
                class="subframe-divs-container"
              >
                <!-- B:start-->
                <div
                  class="subframe-divs-groups"
                  v-for="(div, indD) in frame.divs"
                  v-bind:key="`div_${indF}_${indD}`"
                >
                  <div
                    class="add-div"
                    data-position="before"
                    :data-frame-idx="indF"
                    :data-div-idx="indD"
                    v-on:click="add($event)"
                  >
                    Add Div (Before {{ indD }})
                  </div>

                  <div
                    class="obj-div"
                    :data-frame-idx="indF"
                    :data-div-idx="indD"
                  >
                    <label>Color: {{ div.color }}</label>
                    <SelectColor
                      v-model="model.frames[indF].divs[indD].color"
                      :initValue="model.frames[indF].divs[indD].color"
                    />
                    <label>Icon: {{ div.icon }}</label>
                    <SelectAction
                      v-model="model.frames[indF].divs[indD].icon"
                      :initValue="model.frames[indF].divs[indD].icon"
                    />
                  </div>
                </div>
                <div
                  class="add-div"
                  data-position="last"
                  :data-frame-idx="indF"
                  :data-div-idx="frame.divs.length"
                  v-on:click="add($event)"
                >
                  Add Div (At {{ frame.divs.length }})
                </div>
                <!-- B: end-->
              </div>
              <div class="obj-x-label">
                <label class="obj-x-duration">
                  Duration {{ frame.duration }}:
                </label>
                <input v-model="model.frames[indF].duration" />
              </div>
            </template>
          </div>
          <div
            class="add-frame"
            data-position="after"
            :data-frame-idx="indF"
            :data-subframe-idx="indSf"
            v-on:click="add($event)"
          >
            Add Frame (After)
          </div>
        </div>
      </div>
    </form>
  </div>
</template>