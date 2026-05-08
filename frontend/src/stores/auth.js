import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth_user')) || null,
    token: localStorage.getItem('auth_token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async doLogin(credentials) {
      const { data } = await api.post('/api/account/login', {
        userName: credentials.username,
        password: credentials.password,
      })
      this._persist(data)
    },

    async doRegister(payload) {
      const { data } = await api.post('/api/account/register', payload)
      this._persist(data)
    },

    _persist(data) {
      this.token = data.token
      this.user = { userName: data.userName, email: data.email }
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(this.user))
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },

    doLogout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
