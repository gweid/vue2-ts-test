import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GlobalMixin extends Vue {
  message: string = 'mixin'

  created() {
    console.log('mixin中定义的created生命周期')
  }

  changeMessage() {
    this.message = 'mixin: change message'
  }
}