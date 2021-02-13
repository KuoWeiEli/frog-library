<template>
  <basic-card
      :loading="card.loading"
      :disabled="card.disabled"
      width="900"
      title="就只差一步！填上您的基本資料享受各項功能！"
  >
    <template v-slot:prepend>
      <!--      <v-avatar-->
      <!--          class="ma-3 sm"-->
      <!--          max-width="300"-->
      <!--          min-width="100"-->
      <!--          tile-->
      <!--      >-->
      <v-img
          contain
          @load="avatarLoaded"
          :src="avatar || require('../../assets/icon_employee_suit.svg')"
      ></v-img>
      <!--      </v-avatar>-->
    </template>

    <v-form
        @submit.prevent="save"
        ref="userBasicForm"
        v-model="valid"
        lazy-validation
    >
      <v-row>
        <v-col
            cols="12"
            sm="8"
        >
          <email
              v-model="editedItem.email"
              disabled
          ></email>
        </v-col>
        <v-col
            cols="12"
            sm="4"
        >
          <v-text-field
              v-model="editedItem.empid"
              :rules="rules.empid"
              label="員工編號"
              placeholder="Ex: 0400"
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
        >
          <v-text-field
              v-model="editedItem.nameTW"
              :rules="rules.nameTW"
              label="中文名稱"
              placeholder="Ex: 黃國維"
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
        >
          <v-text-field
              v-model="editedItem.nameEN"
              :rules="rules.nameEN"
              label="英文名稱"
              placeholder="Ex: Eli Huang"
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
        >
          <img-file
              v-model="editedItem.avatar"
              :show-size="avatarFile.showSize"
              :counter="avatarFile.counter"
              :accept="avatarFile.accept"
              :rules="avatarFile.rules"
              :label="avatarFile.label"
              @upload="upload"
          ></img-file>
        </v-col>
        <v-btn
            type="submit"
            v-show="false"
        ></v-btn>
      </v-row>
    </v-form>
    <template v-slot:action>
      <v-btn
          color="blue darken-1"
          text
          @click="save"
      >
        確定
      </v-btn>
    </template>
  </basic-card>
</template>

<script>
import BasicCard from '@/components/core/BasicCard'
import Email from '@/components/form/element/Email'
import ImgFile from '@/components/form/element/ImgFile'
import UserService from '@/services/aws/user'
import Msg from '@/services/msg'

export default {
  name: "UserBasicForm",
  components: {BasicCard, Email, ImgFile},
  props: {
    editedItem: {}
  },
  data: () => ({
    valid: true,
    avatar: null,
    card: {
      loading: false,
      disabled: false
    },
    rules: {
      empid: [
        v => !!v || '員工編號為必填欄位！',
        v => !v || /^\d{4}$/.test(v) || '員工編號應為數字四碼！',
      ],
      nameTW: [
        v => !!v || '中文姓名為必填欄位！',
        v => !v || /^[\u4E00-\u9FFF]+$/.test(v) || '含有非中文字元！'
      ],
      nameEN: [
        v => !!v || '英文姓名為必填欄位！',
        v => !v || /^[\w\s]+$/.test(v) || '含有非英文字元！'
      ]
    }
  }),
  computed: {
    avatarFile() {
      let avatarChanged = this.editedItem.avatarChanged
          // 新增時需要檢核，編輯時如果有另外上傳大頭貼才需要檢核了
          || !(this.editedItem.id)
      let name = this.editedItem.nameTW

      return {
        accept: avatarChanged ? 'image/png, image/jpeg, image/bmp' : '',
        rules: avatarChanged ? [
          v => !!v || '大頭貼是必填欄位！',
          v => !v || v.size < (2 * 1024 * 1024) || `大小不得超過 2MB！`,
        ] : [() => true],
        counter: avatarChanged,
        showSize: avatarChanged,
        label: avatarChanged ? '大頭貼' : name
      }
    }
  },
  methods: {
    upload(imgFileUrl) {
      // avatarChanged 初始值為 false，一旦經過上傳，將會變為 true
      this.editedItem.avatarChanged = true
      this.avatar = imgFileUrl
      this.card.loading = true
    },
    avatarLoaded() {
      this.card.loading = false
    },
    save() {
      if (!this.$refs.userBasicForm.validate()) return

      const method = 'createUser'
      this.card.loading = true
      this.card.disabled = true

      UserService[method](Object.assign({}, this.editedItem))
          .then(user => {
            Msg.success('儲存成功！')
            this.$emit('success', user)
          })
          .catch(err => {
            console.log(err)
            Msg.error('儲存發生錯誤！請洽系統管理員！')
          })
          .finally(() => {
            this.card.loading = false
            this.card.disabled = false
          })
    }
  }
}
</script>

<style scoped>

</style>