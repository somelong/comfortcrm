<template>
  <div>
    <div v-if="Math.random() > 0.5">
      Now you see me
    </div>
    <div v-else>
      Now you don't
    </div>
  </div>
</template>

<!--<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>-->

<script>
    export default {
      name: "text-view",
      data() {
        return{
          question: '',
          answer: 'I cannot give you an answer until you ask a question!'
        }
      },
      watch: {
      },
      methods: {
      }
    }
</script>

<style scoped>

</style>
