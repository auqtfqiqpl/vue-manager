<template>
  <div class="row">
    <div class="col-8">
      <h3>Draggable table</h3>

      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Sport</th>
          </tr>
        </thead>
        <draggable v-model="list" tag="tbody">
          <tr v-for="item in list" :key="item.name">
            <td scope="row">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.sport }}</td>
          </tr>
        </draggable>
      </table>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: "table-example",
  display: "Table",
  order: 8,
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ],
      dragging: false
    };
  }
};
</script>
<style scoped>
table {
    border-collapse: collapse;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
}
thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
    border:1px solid rgba(0,0,0,.125);
}
.table .thead-dark th {
    color: rgb(145, 142, 142);
    background-color: #dee2e6;
    border-color: 1px solid rgba(0,0,0,.125);
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}

.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    
}

th {
    text-align: inherit;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

td {
    display: table-cell;
    vertical-align: inherit;
}
tr:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
}

/* .table-striped tbody tr:nth-of-type(odd) {
     background-color: rgba(0,0,0,.05);
} */

.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
}
.buttons {
  margin-top: 35px;
}
</style>
