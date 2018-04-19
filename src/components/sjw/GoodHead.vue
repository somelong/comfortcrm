<template>
  <div>
    <el-form :model="dateForm" ref="dateForm"  >

      <el-form-item
        v-for="(domain, index) in dateForm.domains"
        :label="'域名' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
      >
        <el-input v-model="domain.value"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="addDomain">新增域名</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dateForm: {
          domains: [{
            value: ''
          }]
        }
      };
    },
    methods: {
      removeDomain(item) {
        console.log(item)
        var index = this.dateForm.domains.indexOf(item)
        console.log(index)
        if (index !== -1) {
          this.dateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>
