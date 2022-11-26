<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" class="city-cascade">
        <el-cascader
          v-model="value1"
          :options="options"
          style="width: 100%;min-width: 400px"
        >
        </el-cascader>
      </el-col>
      <el-col :span="8" class="city-cascade">
        <el-cascader
          v-model="value2"
          :options="options"
          style="width: 100%;min-width: 400px"
        >
        </el-cascader>
      </el-col>
      <el-col :span="8" class="city-cascade">
        <el-button
          @click="handleDiff"
        >对比</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="city-cascade">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import {cityCascade} from "@/utils/city-cascade";
import {getDiffCounty} from "@/request";

export default {
  data(){
    return {
      value1: [],
      value2: [],
      options:cityCascade
    }
  },
  methods:{
    handleDiff(){
      if (this.value1.length === 0 || this.value2.length === 0){
        return
      }
      getDiffCounty({county1:this.value1[2],county2:this.value2[2]}).then(response => {
        if (response){
          console.log(response)
          this.list = response.data
          this.listLoading = false
        }else {
          this.$message.error("请先登录！")
          this.$router.push("/login")
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
