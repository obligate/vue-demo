import Vue from 'vue';
import VueRouter from 'vue-router';

// 2. 手动安装 VueRouter
Vue.use(VueRouter);

// 导入 app组件
import app from './App.vue';


// 导入 自定义路由模块
import router from './router.js';



var vm = new Vue({
    el:'#app',
    render:c=>c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以，不要把 路由的 router-view 和 router-link 直接写到 el 所控制的元素中
    router, // 4. 将路由对象挂载到 vm 上
});

//  注意：App 这个组件，是通过 vm 实例 render 函数，渲染出来的， render 函数如果要渲染 组件，渲染出来的组件，只能放到 el:'#app' 所指定的元素中；
//  Account 和 GoodsList 组件，是通过 路由 匹配 监听到的，所以，这两个组件，只能展示到属于 路由的router-view></router-view> 中去