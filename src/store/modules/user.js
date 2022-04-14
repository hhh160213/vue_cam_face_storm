import { login, logout, getInfo } from '@/api/user'
import {getstuInfo, listUser} from '@/api/present/stuapi'
import { listTea} from '@/api/present/teaapi'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { wsClose } from '@/utils/websocket'
import getters from "@/store/getters";

const state = {
  token: getToken(),
  user_id: 0,
  user_email: '',
  user_nick_name: '',
  stu_id: 0,
  stu_name: '',
  tea_name: '',

  tea_id: 0,
  name: '',
  avatar: '',
  menus: [],
  buttons: [],
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  },
  SET_USERID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_USEREMAIL: (state, user_email) => {
    state.user_email = user_email
  },
  SET_USERNICKNAME: (state, user_nick_name) => {
    state.user_nick_name = user_nick_name
  },

    SET_STUID: (state, stu_id) => {
    state.stu_id = stu_id
  },




    SET_STUNAME: (state, stu_name) => {
    state.stu_name = stu_name
  },


     SET_TEAID: (state, tea_id) => {
    state.tea_id = tea_id
  },

     SET_TEANAME  : (state, tea_name) => {
    state.tea_name = tea_name
  },



  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        // const {studata} = response
        // let studata=response.studata

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, user_id, name, avatar, menus, buttons,user_email ,user_nick_name} = data
        // const { stu_id,stu_name} = studata

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_USERID', user_id)
        commit('SET_USEREMAIL', user_email)
        commit('SET_USERNICKNAME', user_nick_name)


        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_MENUS', menus)
        commit('SET_BUTTONS', buttons)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
        dispatch('chat/delChatData', null, { root: true })
        wsClose()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
