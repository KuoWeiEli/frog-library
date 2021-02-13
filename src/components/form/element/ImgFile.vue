<template>
  <v-file-input
      v-bind="$attrs"
      :value="value"
      @change="upload"
  ></v-file-input>
</template>

<script>
export default {
  name: "ImgFile",
  props: {
    value: {}
  },
  methods: {
    /** 當圖片上傳完畢，取得圖片 Url 以實現預覽功能 **/
    upload(imgFile) {
      // in order to related to v-model
      this.$emit('input', imgFile)

      let vm = this
      if (imgFile) {
        let reader = new FileReader()
        reader.onload = function(event) {
          vm.$emit('upload', event.target.result)
        }

        // 當 reader 讀取完成後，會觸發 onload event
        reader.readAsDataURL(imgFile)
      } else {
        vm.$emit('upload', null)
      }
    }
  }
}
</script>