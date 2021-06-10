<template>
  <div class="home">
    <h1>This is an home page</h1>
    <hr>
    <div>
      <p>{{ msg }}</p>
      <div>
        <span>count: {{ count }} </span>
        <button @click="addCount">count+</button>
      </div>
      <p>{{ getFullName }}</p>
    </div>
    <user-list :users="users" @add-age="handleAddAge" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import UserList from '../components/userList.vue'
import { IUsers } from './types'

@Component({
  components: {
    UserList
  }
})
export default class Home extends Vue {
  msg: string = 'hello, vue'

  count: number = 0
  addCount() {
    this.count++
  }

  created() {
    console.log('created生命周期')
  }

  firstName: string = '张'
  lastName: string = '三'
  get getFullName() {
    return this.firstName + this.lastName
  }

  @Watch('count')
  changeCount(newVal: number, oldVal: number) {
    console.log('count 值变了')
  }

  users: IUsers[] = [
    {
      id: '001',
      name: '张三',
      age: 20,
      sex: 1
    },
    {
      id: '002',
      name: '梁红',
      age: 22,
      sex: 0
    }
  ]
  handleAddAge(id: string) {
    this.users.some(item => {
      if (item.id === id) {
        item.age++
        return true
      }
      return false
    })
  }
}
</script>
