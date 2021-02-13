import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '@/model/user'

Vue.use(Vuex)

const state = {
    user : {}
}

/** sync **/
const mutations = {
    setUser(state, data) {
        this.state.user = (data || new User().defaultUser())
    }
}

/** async **/
const actions = {

}

export default new Vuex.Store({
    state, mutations, actions
})