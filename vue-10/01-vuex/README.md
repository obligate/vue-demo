# Vuex
Vuex 是 vue 配套的 公共数据管理工具，它可以把一些共享的数据，保存到 vuex 中，方便 整个程序中的任何组件直接获取或修改我们的公共数据；
Vuex 是为了保存组件之间共享数据而诞生的，如果组件之间有药共享的数据，可以直接挂载到  vuex 中，而不必通过父子组件之间传值了，如果组件的数据不需要共享，此时，做这些不需要共享的私有数据，没有必要放到 vuex 中

只有共享的数据，才有权利放到 vuex 中
组件内部私有的数据，只要放到 组件的 data 即可
props ,data ,vuex 的区别

根据以上的描述，我们可以得出一个结论：
Vuex 是一个全局的共享数据存储区域，就相当于是一个数据的仓库；

## 步骤
1. 运行 `npm i vuex -S`
2. 导入包 `import Vuex from 'vuex'`
3. 注册 vuex 到vue中,`Vue.use(Vuex)`
4. `new Vuex.Store()`实例，得到一个 数据仓储对象
```
    var store = new Vuex.Store({
        state:{
            // 可以把state 想象成组件中的 data，专门用来存储数据的
            // 如果在组件中，想要访问 store 中的数据，只能通过 this.$store.state.*** 来访问
            count:0
        },
        mutations:{
            // 注意： 如果要操作 store 中的 state 的值，只能通过调用mutations 提供的方法，才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，不能快速定位到错误的原因，因为每个组件都可能有操作数据的方法；
            // 注意： 如果组件想要调用 mutations 中的方法， 只能使用 this.$store.commit('方法名');
            // 这种调用 mutations 方法的格式，和 this.$emit('父组件中的方法名')
            increment(state){
                state.count++
            },
            // 注意： mutations 的函数参数列表中，最多支持两个产生，其中，参数1，是state状态，参数2，通过commit提交过来的参数
            // 调用： this.$store.commit('substract',{c:3,d:4});
            substract(state,obj){
                state.count -=(obj.c+obj.d)
            }
        },
        getters:{
            // 注意： 这里的 getters， 只负责对外提供数据($store.getters.optCount)，不负责修改数据，如果想要修改 state 中的数据，请去找 mutations
            
            optCount:function(state){
                return '当前最新的count值是：' + state.count
            }
        }
    });
```
5. 挂载到 vm 实例上
```
const vm = new Vue({
    el:'#app',
    render:c=>c(App),
    store:store
});
```


<!--  总结
    1. state 中的数据，不能直接修改，如果想要修改，必须通过 mutations
    2. 如果组件想要从 state 上获取数据，需要 this.$store.state.***
    3. 如果组件，想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法的名称',唯一的一个参数)
    4. 如果store 中 state 上的数据，在对外提供的时候，需要做一层包装，那么，推荐使用 getters，如果需要使用 getters，则用 this.$store.getters.***
 -->