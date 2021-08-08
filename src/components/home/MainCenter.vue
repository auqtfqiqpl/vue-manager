<template>
  <div class="nav-center">
      <!-- <query-view></query-view>
      <table-view></table-view> -->
      <router-view></router-view>
  </div>
</template>

<script>
import QueryView from "../common/table/QueryView";
import TableView from '../common/table/TableView';

export default {
  components: {
    QueryView,
    TableView,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.nav-center {
    overflow: hidden;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    height: 79.5vh;
}
</style>
