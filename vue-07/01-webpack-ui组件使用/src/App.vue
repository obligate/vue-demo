<template>
    <div>
        <h1> 这是APP 组件</h1>
        <!--  为什么这里叫做 mt-button 的button 直接能使用 -->
        <mt-button type="danger" icon="more" @click="show">default</mt-button>
        <mt-button type="danger" size="large" plain>default</mt-button>
        <mt-button type="danger" size="small" disabled>default</mt-button>

        <!-- mui 按钮使用 -->
        <button type="button" class="mui-btn mui-btn-royal"> 紫色 </button>
        <!-- <mybtn >123</mybtn> -->
        <router-link to="/account"> Account </router-link>
        <router-link to="/goodslist"> Goodslist </router-link>
       <router-view></router-view>
    </div>
</template>

<script>
// 按需导入 Toast 组件
import { Toast } from "mint-ui";
1;

export default {
  data() {
    return {
        totastInstance: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // 模拟获取列表的一个 Ajax 方法
      // 在获取数据之前，立即弹出 Toast 提示用户，正在加载数据
      this.show();
      setTimeout(() => {
        // 当3秒过后，数据获取回来了，要把Toast移除
        this.totastInstance.close();
      }, 3000);
    },
    show() {
      // Toast('提示信息');
      this.totastInstance = Toast({
        message: "这是消息",
        duration: -1, // -1代表不会自动关闭
        position: "top",
        iconClass: "glyphicon glyphicon-repeat", // 设置图标的类
        className: "mytoast" // 自定义Toast的样式，需要自己提供一个类名
      });
    }
  }
};
</script>

<style></style>
