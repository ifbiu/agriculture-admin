<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" class="city-cascade">
        <el-cascader
          v-model="value"
          :options="options"
          style="width: 100%;min-width: 400px"
          @change="handleChange"
        />
      </el-col>
    </el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="旗县" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.county }}
        </template>
      </el-table-column>
      <el-table-column label="人口数" width="110" align="center">
        <template slot-scope="scope">
          <input style="width: 60px;border:0px;" v-model="scope.row.population"></input>
        </template>
      </el-table-column>
      <el-table-column label="生产总值" width="110" align="center">
        <template slot-scope="scope">
          <input style="width: 80px;border:0px;" v-model="scope.row.gdp"></input>
        </template>
      </el-table-column>
      <el-table-column label="生产总值增长率" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gdp_incr | statusFilter">
            <input style="width: 40px;border:0px;" v-model="scope.row.gdp_incr"></input>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="耕地面积" width="120" align="center">
        <template slot-scope="scope">
          <input style="width: 80px;border:0px;" v-model="scope.row.cultivated_area"></input>
        </template>
      </el-table-column>
      <el-table-column label="耕地面积增长率" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cultivated_area_incr | statusFilter">
            <input style="width: 40px;border:0px;" v-model="scope.row.cultivated_area_incr"></input>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="总播种面积" width="120" align="center">
        <template slot-scope="scope">
          <input style="width: 80px;border:0px;" v-model="scope.row.sown_area"></input>
        </template>
      </el-table-column>
      <el-table-column label="总播种面积增长率" width="140" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sown_area_incr | statusFilter">
            <input style="width: 40px;border:0px;" v-model="scope.row.sown_area_incr"></input>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="粮食产量" width="120" align="center">
        <template slot-scope="scope">
          <input style="width: 80px;border:0px;" v-model="scope.row.grain_yield"></input>
        </template>
      </el-table-column>
      <el-table-column label="粮食产量增长率" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.grain_yield_incr | statusFilter">
            <input style="width: 40px;border:0px;" v-model="scope.row.grain_yield_incr"></input>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="油料产量" width="120" align="center">
        <template slot-scope="scope">
          <input style="width: 80px;border:0px;" v-model="scope.row.oil_production"></input>
        </template>
      </el-table-column>
      <el-table-column label="油料产量增长率" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.oil_production_incr | statusFilter">
            <input style="width: 40px;border:0px;" v-model="scope.row.oil_production_incr"></input>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <div @click="updateInfo(scope.row)">修改信息</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getYearBooks, postYearBooks} from '@/request'
import { cityCascade1 } from '@/utils/city-cascade'
import { mapState } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      status = parseFloat(status)
      if (status > 0) {
        return statusMap.published
      } else if (status < 0) {
        return statusMap.deleted
      } else {
        return statusMap.draft
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      value: [],
      options: cityCascade1
    }
  },
  created() {
    this.listLoading = false
  },
  methods: {
    handleChange(value) {
      this.listLoading = true
      getYearBooks({ city: value[1] }).then(response => {
        if (response) {
          this.list = response.data
          this.listLoading = false
        } else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
        }
      })
    },
    updateInfo(row) {
      console.log(row)
      this.listLoading = true
      postYearBooks({ data: row }).then(response => {
        if (response) {
          this.list = response.data
          this.listLoading = false
          this.$message.success("修改成功")
        } else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
        }
      })
    }
  },

}
</script>

<style lang="scss" scoped>
.app-container{
  .city-cascade{
    margin: 30px 0;
  }
}
</style>
