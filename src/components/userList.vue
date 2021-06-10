<template>
  <div class="user-list">
    <div v-for="item in users" :key="item.id">
      <span>姓名：{{ item.name }}</span> |
      <span>年龄：{{ item.age }}</span> |
      <button @click="addAge(item.id)">年龄+</button>
      <span>性别：{{ formatSex(item.sex) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { IUsers } from '../views/types'

@Component({})
export default class UserList extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly users !: IUsers[]

  formatSex(sex: number) {
    const sexMap = new Map([
      [0, '女'],
      [1, '男']
    ])

    return sexMap.get(sex) || '--'
  }

  // 也可以不使用 @Emit，直接 this.$emit
  // 有些场景下面是需要直接使用 this.$emit 的
  @Emit('add-age')
  addAge(id: string) {
    return id
  }
}
</script>
