import Vue from 'vue';
import { $rest } from './main'

declare module 'vue/types/vue' {
  // Vue 的全局属性
  interface Vue {
    $rest: typeof $rest
  }
}