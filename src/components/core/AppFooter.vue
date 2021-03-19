<template>
  <v-footer
      padless
  >
    <v-card
        width="100%"
        flat
        tile
        class="green darken-4 lighten-1 white--text text-center"
    >
      <div class="d-sm-flex flex-sm-nowrap justify-sm-space-between">
        <v-avatar
            class="hidden-sm-and-down"
            tile
            size="200"
        >
          <v-img
              contain
              :src="require('../../assets/img_menu_top_frog.png')"
              transition="scale-transition"
          ></v-img>
        </v-avatar>
        <div>
          <v-card-text>
            <v-btn
                class="mx-4 white--text"
                href="https://github.com/KuoWeiEli"
                text
                target="_blank"
            >
              <v-icon size="24px">
                mdi-github
              </v-icon>
              &emsp;github.com/KuoWeiEli
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            德義資訊是由一群擁有高品質的微軟、JAVA、AWS雲端技術的夥伴們組成，以專業品質提供企業用戶專業軟體服務。<br/>
            藉由專業人才及各種產業相關知識上深厚能力的緊密結合，德義充分協助了客戶縮短產品上市時間在關鍵任務及知識密集的系統上降低軟體開發過程中的風險。<br/>
            並且在「用心」、「專業」及「創新」的經營理念下，創造員工、客戶及公司的三方皆贏的永續經營。
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>版權所有 © 蛙尬藝股份有限公司</strong>
          </v-card-text>
        </div>
        <v-avatar
            class="align-self-end shrink mt-1 hidden-sm-and-down"
            tile
            width="200"
            height="99"
        >
          <v-img
              contain
              :src="require('../../assets/img_home_frog.png')"
              transition="scale-transition"
          ></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
}
</script>

<style scoped>
</style>