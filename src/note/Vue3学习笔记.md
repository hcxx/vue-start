# Vue 3 学习笔记

## 1. 动态参数和动态事件绑定

### 动态参数
- 使用 `:[attributeName]` 绑定动态属性
- 示例：`<a :[attributeName1]="url">`
- 当 `attributeName1` 变化时，绑定的属性会随之变化

### 动态事件绑定
- 使用 `@[eventName]` 绑定动态事件
- 示例：`<button @[eventName]="handleEvent">`
- 可以通过下拉选择或按钮切换事件类型

## 2. 响应式数据

### ref
- 用于创建响应式数据
- 访问和修改值时需要使用 `.value`
- 示例：
  ```javascript
  const count = ref(0)
  function add() {
    count.value++
  }
  ```

### 计算属性
- 使用 `computed()` 创建
- 具有缓存机制，只有依赖变化时才重新计算
- 支持 getter/setter
- 示例：
  ```javascript
  const fullName = computed({
    get() { return firstName.value + ' ' + lastName.value },
    set(newValue) { [firstName.value, lastName.value] = newValue.split(' ') }
  })
  ```

## 3. 条件渲染

### v-if vs v-show
- **v-if**: 条件为 false 时不渲染到 DOM
- **v-show**: 条件为 false 时通过 display: none 隐藏
- **性能对比**:
  - v-if: 切换开销高，初始渲染开销低
  - v-show: 切换开销低，初始渲染开销高
- **使用场景**:
  - 频繁切换：使用 v-show
  - 条件很少改变：使用 v-if

### v-if 和 v-for 的优先级
- **v-if 优先级高于 v-for**，这会导致 v-if 无法访问 v-for 的变量
- **解决方案**: 使用 template 包装 v-for
  ```vue
  <template v-for="user in users">
    <ul>
      <li v-if="user.isActive" :key="user.id">
        {{ user.name }} - {{ user.isActive }}
      </li>
    </ul>
  </template>
  ```

## 4. 列表渲染

### 数组变化检测
- Vue 能够监听数组变化的方法：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`
- 不会改变原数组的方法：`filter`、`map`、`reduce`、`concat`、`slice`

### 计算属性中的数组操作
- 在计算属性中使用 `reverse()` 和 `sort()` 时要小心，它们会改变原数组
- **正确做法**: 在调用这些方法前创建原数组的副本
  ```javascript
  // 推荐
  return [...numbers].reverse()
  // 不推荐
  return numbers.reverse()
  ```

## 5. 事件处理

### 事件绑定
- 使用 `@click` 简写 `v-on:click`
- 可以传递参数：`<button @click="say('hello')">`
- 可以访问原生事件：`<button @click="warn('未提交', $event)">`

### 事件修饰符
- `.once`: 只执行一次
- `.prevent`: 阻止默认事件
- `.stop`: 阻止事件冒泡
- `.self`: 只触发当前元素的事件，不触发子元素的事件
- 可以链式使用：`@click.stop.prevent`

## 6. 表单输入绑定

### v-model
- 用于双向数据绑定
- 支持不同类型的表单元素：
  - 文本输入：绑定字符串
  - 复选框：单个绑定布尔值，多个绑定数组
  - 单选按钮：绑定字符串
  - 下拉选择：绑定字符串或对象

### 修饰符
- `.lazy`: 失去焦点或回车时更新
- `.number`: 自动转换为数字类型
- `.trim`: 自动去除首尾空格

## 7. 侦听器

### watch
- 用于监听响应式数据的变化
- 可以监听单个 ref、getter 函数、多个来源的数组
- 支持深度监听、立即执行、一次性执行等选项
- 示例：
  ```javascript
  watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.endsWith('?')) {
      // 处理逻辑
    }
  })
  ```

### watchEffect
- 自动追踪依赖，不需要指定侦听对象
- 立即执行一次，之后自动重新执行
- 适合处理副作用
- 注意：只追踪第一个 await 之前访问的依赖

### 副作用清理
- 使用 `onWatcherCleanup` 清理副作用
- 适合处理异步操作的取消

## 8. 模板引用

### 基本用法
- 使用 `ref()` 创建模板引用
- 在模板中使用 `ref="name"` 绑定
- 在 `onMounted` 中访问 DOM 元素
- 示例：
  ```javascript
  const myInput = ref(null)
  onMounted(() => {
    myInput.value?.focus()
  })
  ```

### v-for 中的模板引用
- 可以获取多个元素的引用
- 注意：在 Vue 3.5+ 中可以使用 `useTemplateRef()`

## 9. 组件通信

### Props
- 子组件通过 `defineProps` 定义
- 父组件通过 attribute 传递
- 示例：
  ```vue
  <!-- 子组件 -->
  const props = defineProps(['title'])
  
  <!-- 父组件 -->
  <BlogPost :title="post.title" />
  ```

### 事件
- 子组件通过 `defineEmits` 定义或直接使用 `$emit`
- 父组件通过 `@事件名` 监听
- 示例：
  ```vue
  <!-- 子组件 -->
  <button @click="$emit('enlarge')">放大文本</button>
  
  <!-- 父组件 -->
  <BlogPost @enlarge="postFontSize += 0.5" />
  ```

### 插槽
- 用于父组件向子组件传递内容
- 支持默认插槽、命名插槽、作用域插槽
- 示例：
  ```vue
  <!-- 子组件 -->
  <div class="alert">
    <slot></slot>
  </div>
  
  <!-- 父组件 -->
  <AlertBox>
    Something bad happened.
  </AlertBox>
  ```

## 10. 常见问题与注意事项

### 计算属性 vs 方法
- **计算属性**: 缓存结果，依赖变化时重新计算
- **方法**: 每次调用都重新计算
- **使用场景**: 计算属性适合复杂计算，方法适合需要参数的场景

### 深层侦听器
- 当侦听对象时，`newValue` 和 `oldValue` 指向同一个对象
- 因为对象的引用没有改变，只是内部属性变化

### 模板引用的时机
- 只能在组件挂载后访问模板引用
- 初次渲染时模板引用为 null

### 事件修饰符的顺序
- 修饰符的顺序很重要
- `@click.prevent.self` 会阻止元素及其子元素的所有点击事件的默认行为
- `@click.self.prevent` 只会阻止对元素本身的点击事件的默认行为

## 11. 最佳实践

1. **组件设计**:
   - 组件应该单一职责
   - 使用 props 传递数据，使用事件传递行为
   - 合理使用插槽实现内容定制

2. **响应式数据**:
   - 优先使用 ref 管理简单状态
   - 复杂状态使用 reactive
   - 计算属性用于派生状态

3. **性能优化**:
   - 合理使用 v-if 和 v-show
   - 避免在模板中直接调用方法
   - 使用 computed 缓存计算结果
   - 合理使用 watch 和 watchEffect

4. **代码风格**:
   - 使用 PascalCase 命名组件
   - 使用 kebab-case 在模板中引用组件
   - 保持模板简洁，逻辑尽量放在 script 中

5. **类型安全**:
   - 使用 TypeScript 增强类型安全性
   - 为 props 和 emits 添加类型定义

## 12. 补充内容

### useTemplateRef (Vue 3.5+)
- Vue 3.5 引入了 `useTemplateRef` 函数
- 提供更好的类型推断和 IDE 支持
- 用法：
  ```javascript
  const input = useTemplateRef('my-input')
  ```

### 组件暴露
- 使用 `<script setup>` 的组件默认是私有的
- 子组件需要通过 `defineExpose` 显式暴露内容给父组件

### 异步组件
- 可以使用 `defineAsyncComponent` 创建异步组件
- 适合大型组件的懒加载

### 组合式函数
- 使用 `useXXX` 命名规范
- 封装可复用的逻辑
- 提高代码可维护性

---

这份笔记涵盖了 Vue 3 的核心特性和使用方法，希望对你的学习有所帮助！# Vue 3 学习笔记

## 1. 动态参数和动态事件绑定

### 动态参数
- 使用 `:[attributeName]` 绑定动态属性
- 示例：`<a :[attributeName1]="url">`
- 当 `attributeName1` 变化时，绑定的属性会随之变化

### 动态事件绑定
- 使用 `@[eventName]` 绑定动态事件
- 示例：`<button @[eventName]="handleEvent">`
- 可以通过下拉选择或按钮切换事件类型

## 2. 响应式数据

### ref
- 用于创建响应式数据
- 访问和修改值时需要使用 `.value`
- 示例：
  ```javascript
  const count = ref(0)
  function add() {
    count.value++
  }
  ```

### 计算属性
- 使用 `computed()` 创建
- 具有缓存机制，只有依赖变化时才重新计算
- 支持 getter/setter
- 示例：
  ```javascript
  const fullName = computed({
    get() { return firstName.value + ' ' + lastName.value },
    set(newValue) { [firstName.value, lastName.value] = newValue.split(' ') }
  })
  ```

## 3. 条件渲染

### v-if vs v-show
- **v-if**: 条件为 false 时不渲染到 DOM
- **v-show**: 条件为 false 时通过 display: none 隐藏
- **性能对比**:
  - v-if: 切换开销高，初始渲染开销低
  - v-show: 切换开销低，初始渲染开销高
- **使用场景**:
  - 频繁切换：使用 v-show
  - 条件很少改变：使用 v-if

### v-if 和 v-for 的优先级
- **v-if 优先级高于 v-for**，这会导致 v-if 无法访问 v-for 的变量
- **解决方案**: 使用 template 包装 v-for
  ```vue
  <template v-for="user in users">
    <ul>
      <li v-if="user.isActive" :key="user.id">
        {{ user.name }} - {{ user.isActive }}
      </li>
    </ul>
  </template>
  ```

## 4. 列表渲染

### 数组变化检测
- Vue 能够监听数组变化的方法：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`
- 不会改变原数组的方法：`filter`、`map`、`reduce`、`concat`、`slice`

### 计算属性中的数组操作
- 在计算属性中使用 `reverse()` 和 `sort()` 时要小心，它们会改变原数组
- **正确做法**: 在调用这些方法前创建原数组的副本
  ```javascript
  // 推荐
  return [...numbers].reverse()
  // 不推荐
  return numbers.reverse()
  ```

## 5. 事件处理

### 事件绑定
- 使用 `@click` 简写 `v-on:click`
- 可以传递参数：`<button @click="say('hello')">`
- 可以访问原生事件：`<button @click="warn('未提交', $event)">`

### 事件修饰符
- `.once`: 只执行一次
- `.prevent`: 阻止默认事件
- `.stop`: 阻止事件冒泡
- `.self`: 只触发当前元素的事件，不触发子元素的事件
- 可以链式使用：`@click.stop.prevent`

## 6. 表单输入绑定

### v-model
- 用于双向数据绑定
- 支持不同类型的表单元素：
  - 文本输入：绑定字符串
  - 复选框：单个绑定布尔值，多个绑定数组
  - 单选按钮：绑定字符串
  - 下拉选择：绑定字符串或对象

### 修饰符
- `.lazy`: 失去焦点或回车时更新
- `.number`: 自动转换为数字类型
- `.trim`: 自动去除首尾空格

## 7. 侦听器

### watch
- 用于监听响应式数据的变化
- 可以监听单个 ref、getter 函数、多个来源的数组
- 支持深度监听、立即执行、一次性执行等选项
- 示例：
  ```javascript
  watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.endsWith('?')) {
      // 处理逻辑
    }
  })
  ```

### watchEffect
- 自动追踪依赖，不需要指定侦听对象
- 立即执行一次，之后自动重新执行
- 适合处理副作用
- 注意：只追踪第一个 await 之前访问的依赖

### 副作用清理
- 使用 `onWatcherCleanup` 清理副作用
- 适合处理异步操作的取消

## 8. 模板引用

### 基本用法
- 使用 `ref()` 创建模板引用
- 在模板中使用 `ref="name"` 绑定
- 在 `onMounted` 中访问 DOM 元素
- 示例：
  ```javascript
  const myInput = ref(null)
  onMounted(() => {
    myInput.value?.focus()
  })
  ```

### v-for 中的模板引用
- 可以获取多个元素的引用
- 注意：在 Vue 3.5+ 中可以使用 `useTemplateRef()`

## 9. 组件通信

### Props
- 子组件通过 `defineProps` 定义
- 父组件通过 attribute 传递
- 示例：
  ```vue
  <!-- 子组件 -->
  const props = defineProps(['title'])
  
  <!-- 父组件 -->
  <BlogPost :title="post.title" />
  ```

### 事件
- 子组件通过 `defineEmits` 定义或直接使用 `$emit`
- 父组件通过 `@事件名` 监听
- 示例：
  ```vue
  <!-- 子组件 -->
  <button @click="$emit('enlarge')">放大文本</button>
  
  <!-- 父组件 -->
  <BlogPost @enlarge="postFontSize += 0.5" />
  ```

### 插槽
- 用于父组件向子组件传递内容
- 支持默认插槽、命名插槽、作用域插槽
- 示例：
  ```vue
  <!-- 子组件 -->
  <div class="alert">
    <slot></slot>
  </div>
  
  <!-- 父组件 -->
  <AlertBox>
    Something bad happened.
  </AlertBox>
  ```

## 10. 常见问题与注意事项

### 计算属性 vs 方法
- **计算属性**: 缓存结果，依赖变化时重新计算
- **方法**: 每次调用都重新计算
- **使用场景**: 计算属性适合复杂计算，方法适合需要参数的场景

### 深层侦听器
- 当侦听对象时，`newValue` 和 `oldValue` 指向同一个对象
- 因为对象的引用没有改变，只是内部属性变化

### 模板引用的时机
- 只能在组件挂载后访问模板引用
- 初次渲染时模板引用为 null

### 事件修饰符的顺序
- 修饰符的顺序很重要
- `@click.prevent.self` 会阻止元素及其子元素的所有点击事件的默认行为
- `@click.self.prevent` 只会阻止对元素本身的点击事件的默认行为

## 11. 最佳实践

1. **组件设计**:
   - 组件应该单一职责
   - 使用 props 传递数据，使用事件传递行为
   - 合理使用插槽实现内容定制

2. **响应式数据**:
   - 优先使用 ref 管理简单状态
   - 复杂状态使用 reactive
   - 计算属性用于派生状态

3. **性能优化**:
   - 合理使用 v-if 和 v-show
   - 避免在模板中直接调用方法
   - 使用 computed 缓存计算结果
   - 合理使用 watch 和 watchEffect

4. **代码风格**:
   - 使用 PascalCase 命名组件
   - 使用 kebab-case 在模板中引用组件
   - 保持模板简洁，逻辑尽量放在 script 中

5. **类型安全**:
   - 使用 TypeScript 增强类型安全性
   - 为 props 和 emits 添加类型定义

## 12. 补充内容

### useTemplateRef (Vue 3.5+)
- Vue 3.5 引入了 `useTemplateRef` 函数
- 提供更好的类型推断和 IDE 支持
- 用法：
  ```javascript
  const input = useTemplateRef('my-input')
  ```

### 组件暴露
- 使用 `<script setup>` 的组件默认是私有的
- 子组件需要通过 `defineExpose` 显式暴露内容给父组件

### 异步组件
- 可以使用 `defineAsyncComponent` 创建异步组件
- 适合大型组件的懒加载

### 组合式函数
- 使用 `useXXX` 命名规范
- 封装可复用的逻辑
- 提高代码可维护性

---

这份笔记涵盖了 Vue 3 的核心特性和使用方法，希望对你的学习有所帮助！