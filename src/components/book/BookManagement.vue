<template>
  <div>
    <el-table
        :data="books"
        stripe
        style="width: 100%"
        height="800"
        size="small">
      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="edit(scope.row)"
                     size="small" icon="el-icon-edit">編輯
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
          prop="status"
          label="書籍狀態"
          width="80">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'BookManagement',
  created() {
    this.getBooks()
  },
  data() {
    return {
      books: [],
      management: {
        visible: false,
        book: {}
      }
    }
  },
  methods: {
    async getBooks() {
      console.log('getBooks.....')
      axios.get('http://localhost:3000/books')
          .then(response => {
            this.books = response.data
          })
    },
    edit(row) {
      console.log(row)
      this.management.book = row
      this.management.visible = true
    }
  }
}
</script>

<style scoped>

</style>