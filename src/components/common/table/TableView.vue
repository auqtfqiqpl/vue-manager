<template>
  <div class="table">
    <el-table :data="table.data" border style="width: 100%" height="300" @sort-change = "handleSortChange">
      <!--  @select="handleSelect" @row-dblclick="handleRowDbClick"> -->
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="(header, index) in table.config.headerList"
        :key="index"
        :prop="header.code"
        :label="header.name"
        :width="header.width"
      ></el-table-column>
    </el-table>
    <div style="padding-top: 20px">
      <el-pagination
        v-if="table.config.pagePlugin"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="table.config.pageIndex"
        :page-sizes="table.config.pageSizeList"
        :page-size="table.config.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.config.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    table: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleSortChange(column, prop, order) {
        let _this = this;
        _this.table.config.orderKey = prop;
        _this.table.config.orderBy = order;
         _this.queryData();
    },
    handleSizeChange(val) {
      let _this = this;
      _this.table.config.pageSize = val;
      _this.queryData();
    },
    handleCurrentChange(val) {
      let _this = this;
      _this.table.config.pageIndex = val;
      _this.queryData();
    },
    queryData(obj){
      let _this = this;
      let param = {
        ...table.param,
        ...{
          pageSize: table.config.pageSize,
          pageIndex: table.config.pageIndex,
          orderKey : table.config.orderKey,
          orderBy : table.config.orderBy
        },
      };
      if (_this.table && _this.table.url) {
        _this.$api
          .request(
            table.requestMethod,
            table.url,
            param,
            _this.$api.dataType.json
          )
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  },
};
</script>

<style scoped>
.table {
  line-height: 0px;
  height: 350;
}
</style>