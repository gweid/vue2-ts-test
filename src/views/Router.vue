<template>
  <div class="about"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  created() {
    console.log(this.$route)
    // this.$router.push('')
  }
}
</script>
