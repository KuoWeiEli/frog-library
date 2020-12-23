<template>

  <div>
    <el-table
        :data="libraryInfo"
        stripe
        style="width: 100%"
        height="800"
        size="small">
      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="appoint(scope.row)"
                     size="small" icon="el-icon-date">預約
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
          prop="bookSeq"
          label="序號"
          width="100">
      </el-table-column>
      <el-table-column
          prop="bookName"
          label="書刊名"
          width="500">
      </el-table-column>
      <el-table-column
          prop="author"
          label="作者"
          width="550">
      </el-table-column>
      <el-table-column
          prop="tech"
          label="技術"
          width="250">
      </el-table-column>
      <el-table-column
          prop="publisher"
          label="出版社"
          width="80">
      </el-table-column>
      <el-table-column
          prop="publishDate"
          label="出版年"
          width="100">
      </el-table-column>
      <el-table-column
          prop="empId"
          label="借閱者員編"
          width="90">
      </el-table-column>
      <el-table-column
          prop="empName"
          label="借閱者"
          width="80">
      </el-table-column>
      <!--    <el-table-column-->
      <!--        prop="getDateRange"-->
      <!--        label="領取起訖日"-->
      <!--        width="180">-->
      <!--    </el-table-column>-->
      <el-table-column
          prop="bollowDateRange"
          label="借閱起訖日"
          width="100">
      </el-table-column>
      <!--    <el-table-column-->
      <!--        prop="returnDate"-->
      <!--        label="歸還日期"-->
      <!--        width="180">-->
      <!--    </el-table-column>-->
      <el-table-column
          prop="bookStatus"
          label="狀態"
          width="80">
      </el-table-column>
      <el-table-column
          prop="waitNum"
          label="預約等待人數"
          width="110">
      </el-table-column>
    </el-table>

    <appoint-dialog :appointment="appointment"/>
  </div>


</template>

<script>
import axios from "axios";
import AppointDialog from "@/components/AppointDialog";

export default {
  name: 'LibraryInfo',
  components: {AppointDialog},
  created() {
    this.getLibraryInfo()
  },
  data() {
    return {
      libraryInfo: [],
      appointment: {
        visible: false,
        bookData: {},
        empData: {
          empId: '0400',
          empName: '黃國維'
        }
      }
    }
  },
  methods: {
    async getLibraryInfo() {
      console.log('getLibraryInfo.....')
      axios.get('http://localhost:3000/libraryInfo')
          .then(response => {
            this.libraryInfo = response.data
          })
    },
    appoint(row) {
      console.log(row)
      this.appointment.bookData = row
      this.appointment.visible = true
    }
  }
}
</script>

