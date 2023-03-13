<template>
  <div class="ball-box">
    <div>
      <v-text-field
        dense
        outlined
        v-model="minBall"
        :counter="4"
        :rules="[
          rules.emptyValue,
          rules.valueLength,
          rules.invalidValue,
          rules.valueIsNumber,
          rules.valueNotZero
        ]"
        prepend-icon="mdi-minus-thick"
        :label="currentLang.dashboardView[52]"
      ></v-text-field>
      <v-text-field
        dense
        outlined
        v-model="maxBall"
        :counter="4"
        :rules="[
          rules.emptyValue,
          rules.valueLength,
          rules.invalidValue,
          rules.valueIsNumber,
          rules.valueNotZero
        ]"
        prepend-icon="mdi-plus-thick"
        :label="currentLang.dashboardView[53]"
      ></v-text-field>
    </div>

      <v-select
      :items="ballIntervals"
      :placeholder="currentLang.workspaceView[30]"
      outlined
      dense
      v-model="ballInterval"
      prepend-icon="mdi-alpha-t-box-outline"
      ></v-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import intervalGenerator from '@/plugins/intervalGenerator'

export default {
  props: {
    min: String,
    max: String,
    interval: String,
    settingsFunc: Function,

    currect: Boolean,
  },
  data() {
    return {
      rules: {
        valueIsNumber: (v) => {
          const pattern = /^[0-9]*\.?[0-9]*$/;
          if (pattern.test(v)) {
            this.valueIsNumber = true;
            return true;
          } else {
            this.valueIsNumber = false;
            return this.currentLang.dashboardView[55];
          }
        },
        valueNotZero: (v) => {
          if (v != 0) {
            this.valueNotZero = true;
            return true;
          } else {
            this.valueNotZero = false;
            return this.currentLang.dashboardView[56];
          }
        },

        valueLength: (v) => {
          if (v.length <= 4) {
            this.valueLength = true;
            return true;
          } else {
            this.valueLength = false;
            return this.currentLang.dashboardView[57];
          }
        },
        invalidValue: (v) => {
          const start = /^0[0-9]+/;
          if (v.match(start)) {
            this.invalidValue = false;
            return this.currentLang.dashboardView[58];
          } else {
            this.invalidValue = true;
            return true;
          }
        },
        emptyValue: (v) => {
          if (v.length != 0) {
            this.emptyValue = true;
            return true;
          } else {
            this.emptyValue = false;
            return this.currentLang.dashboardView[59];
          }
        },
      },

      minBall: this.min,
      maxBall: this.max,
      ballInterval: this.interval,
      ballIntervals: [this.min],

      valueIsNumber: false,
      valueNotZero: false,
      valueLength: false,
      invalidValue: false,
      emptyValue: false,

      ballIsCurrect: this.currect,
    };
  },
  computed: mapGetters(['currentLang']),
  watch: {
    minBall() {
      this.settingsFunc("min", this.minBall);

      if(this.maxBall){
        this.ballIntervals = intervalGenerator(this.minBall, this.maxBall)
      }
    },
    maxBall() {
      this.settingsFunc("max", this.maxBall);

      if(this.minBall){
        this.ballIntervals = intervalGenerator(this.minBall, this.maxBall)
      }
    },
    ballInterval() {
      this.settingsFunc("interval", this.ballInterval);
    },

    valueIsNumber() {
      if (
        this.valueIsNumber &&
        this.valueNotZero &&
        this.valueLength &&
        this.invalidValue &&
        this.emptyValue
      ) {
        this.ballIsCurrect = true;
      } else {
        this.ballIsCurrect = false;
      }
    },
    valueNotZero() {
      if (
        this.valueIsNumber &&
        this.valueNotZero &&
        this.valueLength &&
        this.invalidValue &&
        this.emptyValue
      ) {
        this.ballIsCurrect = true;
      } else {
        this.ballIsCurrect = false;
      }
    },
    valueLength() {
      if (
        this.valueIsNumber &&
        this.valueNotZero &&
        this.valueLength &&
        this.invalidValue &&
        this.emptyValue
      ) {
        this.ballIsCurrect = true;
      } else {
        this.ballIsCurrect = false;
      }
    },
    invalidValue() {
      if (
        this.valueIsNumber &&
        this.valueNotZero &&
        this.valueLength &&
        this.invalidValue &&
        this.emptyValue
      ) {
        this.ballIsCurrect = true;
      } else {
        this.ballIsCurrect = false;
      }
    },
    emptyValue() {
      if (
        this.valueIsNumber &&
        this.valueNotZero &&
        this.valueLength &&
        this.invalidValue &&
        this.emptyValue
      ) {
        this.ballIsCurrect = true;
      } else {
        this.ballIsCurrect = false;
      }
    },

    ballIsCurrect() {
      this.settingsFunc("currect", this.ballIsCurrect);
    },
    // valueIsNumber(){
    //     console.log(this.valueIsNumber)
    // }
  },
  // mounted() {
  //     console.log(this.valueIsNumber)
  // },
};
</script>

<style scoped>
.ball-box {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  justify-content: space-between;
  gap: 40px;
}

.go {
  width: 100%;
}

.theme--light.v-list {
    overflow-y: scroll;
    max-height: 200px;
}
</style>
