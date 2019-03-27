
<template>
    <div> 这是登陆组件，使用.vue文件定义出来----------{{msg}}</div>
</template>

<script>
export default {
     data(){ 
         // 注意： 组件中的data 必须是 function
        return {
            msg:'123'
        };
     },
     methods:{
         show(){
             console.log("调用了 login.vue 中的 show 方法");
         }
     }
 };
</script>
 
<style>
</style>