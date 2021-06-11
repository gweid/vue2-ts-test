# Vue2.x 使用 ts 开发

vue2.x 使用 typescript 开发的一些记录



## 1、创建项目

首先，利用 vue-cli 创建一个 typescript 环境的项目

1. 控制台执行 `vue create vue2-ts-test`

2. 会出现选择，这里选择第三项，自定义项目用到的功能

   ![](/imgs/img1.png)

3. 选择自定义功能，如下

   ![](/imgs/img2.png)

4. 接着选择 vue2.x 版本

   ![](/imgs/img3.png)

5. 是否选择 class 类声明组件的形式，这里选择 yes

   ![](/imgs/img4.png)

   class 类声明组件是指：

   ```js
   export default class Home extends Vue {}
   ```

   后面再展开

6. 是否使用 babel 结合 typescript，这里选择 yes

   ![](/imgs/img5.png)

   在 ts 中，除了可以做类型检查，也可以做语法转换，但是太高级的语法没办法转换，并且做不到 polyfills，那么就需要 babel 对高级语法进行转换和 polyfills，此时就会有功能的重叠。因此，一般都是使用 babel 与 ts 结合的方式，babel 做语法转换和 polyfills 功能，ts 专注于类型检查

7. 是否使用 history 模式的 router，这里根据个人项目需求

   ![](/imgs/img6.png)

8. babel、eslint 之类的配置文件是否单独生成，还是耦合在 package.json 中，这里选择第一项：单独生成

   ![](/imgs/img7.png)

9. 是否保存当前选择，下次直接使用这些选择，这里选择 no

   ![](/imgs/img8.png)

接下来，就是等待项目创建完毕，打开项目，执行命令启动项目即可



## 2、ts 环境下的 vue 项目结构

![](/imgs/img9.png)

整体目录结构上是没有多大的变化。可以看出来的变化是：

- js 文件改为 ts 文件
- 多了以下三个文件：
  - shims-tsx.d.ts
  - shims-vue.d.ts
  - tsconfig.json



先看 main.ts，mian.ts 可以说内容好无变化，只是将文件类型改成了 ts 而已



tsconfig.json：这个是 ts 环境的配置文件。因为之前是选择 babel 去转译高级语法，ts 仅做类型检查，所以可以发现，ts 内部的目标 js 使用是 esnext，也就是最新版本的 js 语法，不做转换

![](/imgs/img10.png)



shims-tsx.d.ts：这个是对下 vue 中写 jsx、tsx 语法做处理（不写 jsx 语法，不需要理会）



shims-vue.d.ts，会发现里面有这一段代码：

```js
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

作用：

- 为了 ts 做的适配定义文件，因为 `.vue` 文件不是一个常规的文件类型，ts 是不能理解这种文件是干嘛的
-  加这一段是是告诉 ts，vue 文件是这种类型的
- 如果把这一段删除，会发现 import 的所有 vue 类型的文件都会报错



## 3、ts 下进行 vue 项目开发

![](/imgs/img11.png)

vue2.x 使用 ts 开发，主要依赖了：

- vue-class-component
- vue-property-decorator

这两个包的能力，允许我们以类装饰器的方式进行 ts 开发。

下面来看看一些常用的功能。



### 3-1、ts 类装饰器组件

> home.vue

```js
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
   
}
</script>
```

三个主要点：

- script 标签中需要声明 `lang="ts"`
- 类组件 Home 继承自 Vue
- 类组件必须使用 @Component 装饰



### 3-2、data

ts 中：

```js
<template>
  <div class="home">
    <p>{{ mag }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
   msg: string = 'hello, vue'
}
</script>
```

相当于：

```js
<script>
export default {
   data() {
     return {
       msg: 'hello, vue'
     }
   }
}
</script>
```



### 3-3、method

ts 中：

```js
<template>
  <div class="home">
    <p @click="handleClick">{{ mag }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
   msg: string = 'hello, vue'

   handleClick() {}
}
</script>
```

相当于：

```js
<script>
export default {
   data() {
     return {
       msg: 'hello, vue'
     }
   },
   methods: {
     handleClick() {}
   }
}
</script>
```



### 3-4、生命周期

```js
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
   created() {}
}
</script>
```

相当于：

```js
<script>
export default {
   created() {}
}
</script>
```



### 3-5、cmputed

```js
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  firstName: string = '张'
  lastName: string = '三'

  get getFullName() {
    return this.firstName + this.lastName
  }
}
</script>
```

相当于：

```js
<script>
export default {
   computed: {
     getFullName() {}
   }
}
</script>
```



如果是对象形式的 computed

```js
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  firstName: string = '张'
  lastName: string = '三'

  get getFullName() {
    return this.firstName + this.lastName
  }
  set getFullName() {}
}
</script>
```

相当于：

```js
<script>
export default {
   computed: {
     getFullName: {
       get() {},
       set() {}
     }
   }
}
</script>
```



### 3-6、watch

```js
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  count: number = 0

  @Watch('count')
  changeCount(newVal: number, oldVal: number) {
    console.log('count 值变了')
  }
}
</script>
```

使用的是 Watch 装饰器

- 将 Watch 引入
- `@Watch('count')`， 代表侦听 count
- 下面的 changeCount 就是 count 变化之后执行的回调函数



如果需要使用深度侦听，那么：

```js
@Watch('count', { deep: true })
```

其他的立即执行同理



### 3-7、引入组件使用

有组件 userList.vue：

```js
<template>
  <div class="user-list">
    组件 userList
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class UserList extends Vue {

}
</script>
```

在组件 Home 中需要引用 userList 组件

> home.vue

```js
<template>
  <div class="home">
    <user-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserList from '../components/userList.vue'

@Component({
  components: {
    UserList
  }
})
export default class Home extends Vue {

}
</script>
```

引用组件需要在 @Component 中

```js
@Component({
  components: {
    UserList
  }
})
```



实际上，是组件引用没有提供类似 data、methods 的写法，只能在 @Component 中。

@Component 里面实际上就是 vue2.x 原始的 `export default` 导出的对象，可以写所有的 vue 中语法

```js
@Component({
  components: {
    UserList
  },
  data() {
    return {}
  },
  methods: {
    
  },
  filters: {}
})
```

一些不支持 ts 的就可以写在 @Component 里面，比如 components 组件、filters 过滤器等



### 3-8、父子组件通信

> home.vue

```js
<template>
  <div class="home">
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
```

> userList.vue

```js
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
```



#### 3-8-1、父传子

父传子，在子组件是通过 @Prop 装饰器

```js
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class UserList extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly users !: IUsers[]
}
</script>
```

- readonly：子组件不对父组件传过来的值进行改动，所以使用 readonly 声明只读属性

- `{ type: Array, default: () => [] }` 就相当于：

  ```js
  props: {
    users: {
      type: Array,
      default: () => []
    }
  }
  ```

- 通过 `!:` 注明 users 必然有值，哲理配合 default 默认值，如果没传，就使用默认值 []，所以是必然有值的



#### 3-8-2、子传父

子组件：

```js
<template>
  <div class="user-list">
    <div v-for="item in users" :key="item.id">
      <span>姓名：{{ item.name }}</span> |
      <span>年龄：{{ item.age }}</span> |
      <button @click="addAge(item.id)">年龄+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { IUsers } from '../views/types'

@Component({})
export default class UserList extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly users !: IUsers[]

  // 也可以不使用 @Emit，直接 this.$emit
  // 有些场景下面是需要直接使用 this.$emit 的
  @Emit('add-age')
  addAge(id: string) {
    return id
  }
}
</script>
```

子组件通过装饰器 Emit：

```js
@Emit('add-age')
addAge(id: string) {
  return id
}
```

@Emit('add-age') 里面的 add-age 是父组件接受的事件名，如果不写，@Emit()，那么默认使用下面装饰的函数名 `addAge`  作为父组件接受的事件名，但是会将驼峰转换为 `-` 连接符

`return id` 是代表传递的参数为 id



然后在父组件中：

```js
<template>
  <div class="home">
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
```

接受事件 add-age 即可



### 3-9、mixin

有一个 mixin 如下:

> GlobalMixin.ts

```js
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
```

使用 mixin：

> about.vue

```js
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
```

Mixins 函数里面可以接受多个参数，代表多个 mixin，例如：

```js
import GlobalMixin from '../mixins/GlobalMixin'
import GlobalMixin from '../mixins/xxxxxMixin'

export default class About extends Mixins(GlobalMixin, xxxxxMixin) {}
```



### 3-10、vue-router

```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/:id',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```

定义 vue-router 文件方式基本没有变化，有区别的一点是在定义路由配置文件 routes 的时候，可以指定类型，利用 ts 的类型提示：

```js
import VueRouter, { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = []
```



在使用的时候，基本也没有变化：

```js
// 获取路由参数
this.$route

// 编程式路由跳转
this.$router.push('')
```



### 3-11、vuex

#### 3-11-1、ts 中的 vuex 基本写法

```
store
├── modules                     模块
│   ├── VuexPage                VuexPage 模块
│   │   ├── actions.ts          actions 相关
│   │   ├── constant.ts         变量名
│   │   ├── getters.ts          getter 相关
│   │   ├── mutations.ts        mutations 相关
│   │   ├── types.ts            类型声明
│   ├── index.ts                导出所有模块
├── index.ts                    Vuex 配置初始文件
├── types.ts                    ts 类型声明文件
```



> store/index.ts

```js
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import modules from './modules'
import { IState } from './types'

Vue.use(Vuex)

const store: StoreOptions<IState> = {
  modules
}

export default new Vuex.Store<IState>(store)
```

Vuex 配置初始文件非常简单，通过 `import modules from './modules'` 将所有模块导进来，初始化 Vuex



> store/modules/VuexPage/index.ts

```js
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { IStateInit } from './types'

const stateInit: IStateInit = {
  userInfo: {
    name: '张三',
    age: 18,
    sex: 1,
    token: 'xxxxxxaaaaaabbbbbbccccc',
    hobby: []
  }
}

export default {
  namespaced: true,
  state: stateInit,
  getters,
  mutations,
  actions
}
```



> store/modules/VuexPage/getters.ts

```js
import { IStateInit } from './types'
import { IState } from '../../types'
import { GetterTree } from 'vuex'

// IStateInit 为当前 module 的 state 类型， IState 为根 state 类型
const getter: GetterTree<IStateInit, IState> = {
  getUserInfo(state: IStateInit) {
    return state.userInfo
  }
}

export default getter
```



> store/modules/VuexPage/actions.ts

```js
import { ActionTree } from 'vuex'
import { IStateInit } from './types'
import { IState } from '../../types'
import { SET_USERINFO } from './constant'

// IStateInit 为当前 module 的 state 类型， IState 为根 state 类型
const actions: ActionTree<IStateInit, IState> = {
  [SET_USERINFO]({ commit }, payload) {
    commit(SET_USERINFO, payload)
  }
}

export default actions
```



> store/modules/VuexPage/mutations.ts

```js
import { MutationTree } from 'vuex'
import { IStateInit } from './types'
import { SET_USERINFO } from './constant'

const mutations: MutationTree<IStateInit> = {
  [SET_USERINFO](state, payload) {
    state.userInfo = payload
  }
}

export default mutations
```



#### 3-11-2、配合 vuex-class 使用 vuex

安转 `vuex-class`

```js
npm i vuex-class -S
```



使用：

```js
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
```

如果是 vuex 各个模块下面的，使用 `const VuexPage = namespace('VuexPage')` 定义好模块。这有一个前提，就是各个模块必须开启

命名空间 `namespaced: true`，如果使用了多个模块，那么：

```js
const VuexPage = namespace('VuexPage')
const moduleX = namespace('moduleX')
```



使用的时候，如果是模块下面的：

```js
@VuexPage.Getter('getUserInfo') getUserInfo!: Object
@VuexPage.Action('SET_USERINFO') setUserInfo!: Function

console.log(this.getUserInfo)
this.setUserInfo()
```

如果是 vuex 根下面的：

```js
@Getter('xxxxx') xxxxxx!: Object
@Action('yyyyyy') yyyyyy!: Function

console.log(this.xxxxx)
this.yyyyyy()
```



## 4、增强类型声明

































比如，我们在 main.ts 中，为 vue 的原型上挂载了一些方法：

```js
export const $rest = {
  getUser() {
    return 'user name'
  }
}
Vue.prototype.$rest = $rest
```

这样子在使用的时候，直接 `this.$rest` 是会报错的，因为 vue 身上并没有 $rest 的类型声明，那么就需要我们告诉 ts，这个是什么类型。解决方法，在 `shims-vue.d.ts` 同一级目录下面，新建 `vue.d.ts`

> vue.d.ts

```js
import Vue from 'vue';
import { $rest } from './main'

declare module 'vue/types/vue' {
  // Vue 的全局属性
  interface Vue {
    $rest: typeof $rest
  }
}
```

这样子，就相当于告诉 ts，$rest 的类型就是 main.ts 文件里面声明的 $rest。

这种用法也可以在引用第三方库的时候，比如 axios 通过 this.$axios 调用

【注意：如果没有生效，重启一下 vscode】