<template>
  <div class="about"></div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import GlobalMixin from '../mixins/GlobalMixin'

@Component
export default class About extends Mixins(GlobalMixin) {
  mounted() {
    console.log(this.message)
    this.changeMessage()
    console.log(this.message)
  }
}
</script>
