<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" class="city-cascade">
        <el-cascader
          v-model="value1"
          :options="options"
          style="width: 100%;min-width: 400px"
        />
      </el-col>
      <el-col :span="8" class="city-cascade">
        <el-cascader
          v-model="value2"
          :options="options"
          style="width: 100%;min-width: 400px"
        />
      </el-col>
      <el-col :span="8" class="city-cascade">
        <el-button
          @click="handleDiff"
        >对比</el-button>
      </el-col>
    </el-row>
    <el-row v-if="listShow">
      <div style="width: 1000px">
        <div class="w-title-one">
          <div class="w-title-content">区县</div>
          <div class="w-title-content">人口数</div>
          <div class="w-title-content">生产总值（万元）</div>
          <div class="w-title-content">生产总值增长</div>
          <div class="w-title-content">耕地面积（公顷）</div>
          <div class="w-title-content">耕地面积增长</div>
          <div class="w-title-content">高标准农田面积（公顷）</div>
          <div class="w-title-content">高标准农田面积增长</div>
          <div class="w-title-content">农作物总播种面积（公顷）</div>
          <div class="w-title-content">农作物总播种面积增长</div>
          <div class="w-title-content">粮食产量（吨）</div>
          <div class="w-title-content">粮食产量增长</div>
          <div class="w-title-content">油料产量</div>
          <div class="w-title-content">油料产量增长</div>
        </div>
        <div class="w-title-two">
          <div class="w-content">{{list.CountyData1.county}}</div>
          <div class="w-content">{{list.CountyData1.population}}</div>
          <div class="w-content">{{list.CountyData1.gdp}}</div>
          <div class="w-content">{{list.CountyData1.gdp_incr}}</div>
          <div class="w-content">{{list.CountyData1.cultivated_area}}</div>
          <div class="w-content">{{list.CountyData1.cultivated_area_incr}}</div>
          <div class="w-content">{{list.CountyData1.farmland_area}}</div>
          <div class="w-content">{{list.CountyData1.farmland_area_incr}}</div>
          <div class="w-content">{{list.CountyData1.sown_area}}</div>
          <div class="w-content">{{list.CountyData1.sown_area_incr}}</div>
          <div class="w-content">{{list.CountyData1.grain_yield}}</div>
          <div class="w-content">{{list.CountyData1.grain_yield_incr}}</div>
          <div class="w-content">{{list.CountyData1.oil_production}}</div>
          <div class="w-content">{{list.CountyData1.oil_production_incr}}</div>
        </div>
        <div class="w-title-two">
          <div class="w-content">{{list.CountyData2.county}}</div>
          <div class="w-content">{{list.CountyData2.population}}</div>
          <div class="w-content">{{list.CountyData2.gdp}}</div>
          <div class="w-content">{{list.CountyData2.gdp_incr}}</div>
          <div class="w-content">{{list.CountyData2.cultivated_area}}</div>
          <div class="w-content">{{list.CountyData2.cultivated_area_incr}}</div>
          <div class="w-content">{{list.CountyData2.farmland_area}}</div>
          <div class="w-content">{{list.CountyData2.farmland_area_incr}}</div>
          <div class="w-content">{{list.CountyData2.sown_area}}</div>
          <div class="w-content">{{list.CountyData2.sown_area_incr}}</div>
          <div class="w-content">{{list.CountyData2.grain_yield}}</div>
          <div class="w-content">{{list.CountyData2.grain_yield_incr}}</div>
          <div class="w-content">{{list.CountyData2.oil_production}}</div>
          <div class="w-content">{{list.CountyData2.oil_production_incr}}</div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { cityCascade } from '@/utils/city-cascade'
import { getDiffCounty } from '@/request'

export default {
  data() {
    return {
      value1: [],
      value2: [],
      county1: "",
      county2: "",
      options: cityCascade,
      size: '',
      listShow:false,
      list: {
        CountyData1:{
          id:0,
          county:"",
          population:"",
          gdp:"",
          gdp_incr:"",
          cultivated_area:0,
          cultivated_area_incr:"",
          farmland_area:0,
          farmland_area_incr:"",
          sown_area:0,
          sown_area_incr:"",
          sown_area_incr_sign:0,
          grain_yield:0,
          grain_yield_incr:"",
          grain_yield_incr_sign:0,
          oil_production:0,
          oil_production_incr:"",
          oil_production_incr_sign:0
        },
        CountyData2:{
          id:0,
          county:"",
          population:"",
          gdp:"",
          gdp_incr:"",
          cultivated_area:0,
          cultivated_area_incr:"",
          farmland_area:0,
          farmland_area_incr:"",
          sown_area:0,
          sown_area_incr:"",
          sown_area_incr_sign:0,
          grain_yield:0,
          grain_yield_incr:"",
          grain_yield_incr_sign:0,
          oil_production:0,
          oil_production_incr:"",
          oil_production_incr_sign:0
        }
      },
    }
  },
  methods: {
    handleDiff() {
      if (this.value1.length === 0 || this.value2.length === 0) {
        return
      }
      getDiffCounty({ county1: this.value1[2], county2: this.value2[2] }).then(response => {
        if (response) {
          console.log(response)
          this.list = response.data
          this.listShow = true
        } else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
        }
      })
    },
    //设置表格行的样式
    tableRowStyle({row,rowIndex}){
      return 'background-color:pink;font-size:15px;'
    },
    //设置表头行的样式
    tableHeaderColor({row,column,rowIndex,columnIndex}){
      return 'background-color:lightblue;color:#fff;font-wight:500;font-size:20px;text-align:center'

    }
  }
}

</script>

<style scoped>
.w-title-one{
  width: 200px;
  float: left;
}
.w-title-two{
  width: 400px;
  float: left;
}
.w-title-content{
  width: 200px;
  height: 40px;
  line-height: 40px;
}
.w-content{
  width: 400px;
  height: 40px;
  line-height: 40px;
}
.w-body{
  float: left;
}
</style>
