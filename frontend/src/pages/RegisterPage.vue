<template>
  <img src="~assets/wave.png" class="wave" alt="register-wave" />
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="register-image" />
    </div>

    <div
      v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/avatar.svg" alt="avatar" />
          </q-avatar>
        </q-card-section>

        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Register</h2>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <q-input
              label="Username"
              v-model="form.userName"
              :rules="[(val) => !!val || 'Username is required']"
            />
            <q-input
              label="Email"
              type="email"
              v-model="form.email"
              :rules="[
                (val) => !!val || 'Email is required',
                (val) => /^\S+@\S+\.\S+$/.test(val) || 'Enter a valid email',
              ]"
            />
            <q-input
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              :rules="[(val) => validatePassword(val) === true || validatePassword(val)]"
            >
              <template #append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
            <q-input
              label="Confirm Password"
              :type="showConfirm ? 'text' : 'password'"
              v-model="form.confirmPassword"
              :rules="[(val) => val === form.password || 'Passwords do not match']"
            >
              <template #append>
                <q-icon
                  :name="showConfirm ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showConfirm = !showConfirm"
                />
              </template>
            </q-input>

            <!-- Password strength hint -->
            <q-banner class="bg-grey-9 text-white text-caption rounded-borders">
              Password must be at least 12 characters and include uppercase, lowercase, a number,
              and a special character.
            </q-banner>

            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Create Account"
                type="submit"
                rounded
                :loading="loading"
              />
              <div class="text-center q-mt-sm">
                <router-link class="text-white" to="/login"
                  >Already have an account? Login</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

let $q

export default {
  name: 'RegisterPage',

  data() {
    return {
      loading: false,
      showPassword: false,
      showConfirm: false,
      form: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },

  methods: {
    validatePassword(val) {
      if (!val) return 'Password is required'
      if (val.length < 12) return 'Must be at least 12 characters'
      if (!/[A-Z]/.test(val)) return 'Must contain an uppercase letter'
      if (!/[a-z]/.test(val)) return 'Must contain a lowercase letter'
      if (!/[0-9]/.test(val)) return 'Must contain a number'
      if (!/[^A-Za-z0-9]/.test(val)) return 'Must contain a special character'
      return true
    },

    async submitForm() {
      const auth = useAuthStore()
      this.loading = true

      try {
        await auth.doRegister({
          userName: this.form.userName,
          email: this.form.email,
          password: this.form.password,
        })
        this.$router.push('/admin')
      } catch (err) {
        const detail = err.response?.data?.detail || err.response?.data?.errors
        $q.notify({
          type: 'negative',
          message: Array.isArray(detail) ? detail.join(', ') : detail || 'Registration failed',
        })
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    $q = useQuasar()
  },
}
</script>

<style lang="scss" scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
