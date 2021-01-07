<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        sort-by="tech"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>員工管理</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ headline }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          v-model="editedItem.email"
                          label="電子信箱"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.empId"
                          label="員工編號"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.empName"
                          label="員工姓名"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-select
                          v-model="editedItem.status"
                          :items="userStatusSelect"
                          item-text="label"
                          item-value="value"
                          label="員工狀態"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">

        <v-btn
            x-small
            text
            icon
            class="mr-2"
            color="primary"
            @click="editItem(item)"
        >
          <v-icon small>
            mdi-lead-pencil
          </v-icon>
          編輯
        </v-btn>
      </template>
    </v-data-table>
  </div>


</template>

<script>
import userService from '@/services/user'

export default {
  name: 'UserManagement',
  data: () => ({
    dialog: false,
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '電子信箱', value: 'email'},
      {text: '員工編號', value: 'empId'},
      {text: '員工姓名', value: 'empName'},
      {text: '狀態', value: 'statusDisplay'},
    ],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    // dialog
    date: null,
    maxDate: null,
    menu1: false,
    userStatus: userService.userStatus,
    userStatusSelect: Object.entries(userService.userStatus)
        .map(([key, val]) => {
          return {label: val, value: key}
        })

  }),

  computed: {
    headline() {
      return this.editedIndex === -1 ? 'Add User' : 'Edit User'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initItem() {
      return {
        email: '',
        empId: '',
        empName: '',
        status: ''
      }
    },

    async initialize() {
      userService.getAll()
          .then(data => {
            this.items = data
            this.items.forEach(item => item.statusDisplay = this.userStatus[item.status])
          })

      this.defaultItem = this.initItem()
      this.editedItem = this.initItem()
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()

      this.$message({
        type: 'success',
        message: '修改成功!'
      })
    }
  }
}
</script>

