<template>
  <div>
    <h1>这是一个聊天用的窗口</h1>
    <div class="showView">
      <ul>
        <li>用户发的文字</li>
      </ul>
    </div>
    <div class="textView">
      <textarea class="textBlock" style="width: 1200px;height: 120px"></textarea>
      <button @click="getText">提交按钮</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "myMessage",
      methods:{
        getText: function () {
          console.log($(".textBlock").val());
        }
      },
    }
</script>

<style scoped>
.showView{
  width: 100%;
  height: 500px;
  background: white;
  border: 1px silver solid;
}
.textView{
  width: 100%;
  height: 200px;
  /*background: silver;*/
  border: 1px skyblue solid;
}
</style>
