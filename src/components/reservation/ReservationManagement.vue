<template>
  <div>
    <el-button @click="clearFilter">清除所有過濾器</el-button>
    <el-table
        :data="reservations"
        stripe
        style="width: 100%"
        ref="reservationsTable">
      <el-table-column
          fixed
          align="center"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="operation(scope.row)"
                     :icon="scope.row.editable? 'el-icon-edit': 'el-icon-search'">
            {{ scope.row.editable ? '編輯' : '查看' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
          fixed
          sortable
          align="center"
          prop="status"
          label="預約狀態"
          width="115"
          :formatter="statusTW"
          :filters="filters.status"
          :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
          sortable
          align="center"
          prop="empId"
          label="員工編號"
          width="115"
          :filters="filters.empId"
          :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
          sortable
          prop="empName"
          label="員工姓名"
          width="115"
          :filters="filters.empName"
          :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
          sortable
          prop="applyDate"
          label="申請時間"
          width="100">
      </el-table-column>
      <el-table-column
          sortable
          prop="bookSeq"
          label="書刊序號"
          width="115"
          :filters="filters.bookSeq"
          :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
          sortable
          prop="testName"
          label="測試"
          width="500">
      </el-table-column>
      <el-table-column
          sortable
          prop="bookName"
          label="書刊名"
          width="500"
          :filters="filters.bookName"
          :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
          sortable
          align="center"
          prop="reservationDate"
          label="預約起日"
          width="100">
      </el-table-column>
      <el-table-column
          sortable
          align="center"
          prop="dueDate"
          label="到期時間"
          width="100">
      </el-table-column>
      <el-table-column
          sortable
          align="center"
          prop="verifyDate"
          label="審核時間"
          width="100">
      </el-table-column>
      <el-table-column
          sortable
          align="center"
          prop="takeDate"
          label="取書時間"
          width="100">
      </el-table-column>
      <el-table-column
          sortable
          align="center"
          prop="returnDate"
          label="歸還時間"
          width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "ReservationManagement",
  created() {
    this.initial()
  },
  data() {
    return {
      filters: {
        status: [],
        empId: [],
        empName: [],
        bookSeq: [],
        bookName: []
      },
      statusMap: {
        E: '已歸還',
        D: '已拒絕',
        T: '已逾時',
        C: '已取消',
        2: '待審核',
        3: '待取書',
        4: '待歸還',
      },
      reservations: [],
      management: {
        visible: false,
        reservation: {}
      }
    }
  },
  methods: {
    async initial() {
      await this.getReservations()
      this.checkEditable()
      this.configureFilters()
    },
    async getReservations() {
      return new Promise(resolve => {
        axios.get('http://localhost:3000/reservations')
            .then(response => {
              this.reservations = response.data
              resolve()
            })
      })
    },
    operation(row) {
      this.management.reservation = row
      this.management.visible = true
    },
    statusTW(row) {
      return this.statusMap[row.status];
    },
    checkEditable() {
      this.reservations.forEach(each => {
            // 狀態在 2、3、4 時才可以編輯預約資料
            each.editable = /[234]/.test(each.status)
          }
      );
    },
    configureFilters() {
      // use set object to let filters value unique
      let set = {
        status: new Set(),
        empId: new Set(),
        empName: new Set(),
        bookSeq: new Set(),
        bookName: new Set()
      }

      this.reservations.forEach(each => {
        set['status'].add(each.status)
        set['empId'].add(each.empId)
        set['empName'].add(each.empName)
        set['bookSeq'].add(each.bookSeq)
        set['bookName'].add(each.bookName)
      })

      // 將 set 轉變成 filters 的結構
      for (let each in this.filters) {
        this.filters[each] = [...set[each]].map(prop => {
              // 狀態的值對應成中文字
              let text = each === 'status'?  this.statusMap[prop]: prop
              return this.createFilter(text, prop)
            }
        )
      }
    },
    createFilter(text, val) {
      return {text: text, value: val}
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    clearFilter() {
      this.$refs.reservationsTable.clearFilter()
    }
  }
}
</script>

<style scoped>

</style>