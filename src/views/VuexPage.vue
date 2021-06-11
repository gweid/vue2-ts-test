<template>
  <div class="vuex-page">
    <p>名字：{{ getUserInfo.name }}</p>
    <button @click="changeUserInfo">修改Vuex</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace, Getter, Action } from 'vuex-class'

// vuex 的 VuexPage 模块，如果使用了多个模块，可以声明多个
const VuexPage = namespace('VuexPage')

@Component({})
export default class  extends Vue {
  // vuex 的 VuexPage 模块的 getter 的 getUserInfo
  // 如果没有使用模块下面的，而是直接使用的 vuex 根下面的，直接 @Getter('xxx') 即可
  @VuexPage.Getter('getUserInfo') getUserInfo!: Object
  @VuexPage.Action('SET_USERINFO') setUserInfo!: Function

  created() {
    console.log(this.getUserInfo);
    console.log(this.$rest.getUser());
  }

  changeUserInfo() {
    const newUserInfo = {
    name: '李四',
    age: 18,
    sex: 1,
    token: 'xxxxxxaaaaaabbbbbbccccc',
    hobby: []
  }
    this.setUserInfo(newUserInfo)
  }
}
</script>
