<template>
  <div class="q-pa-md flex center">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md bg-white border">
      <div>
        <div class="text-h4">Welcome back</div>
        <div class="text-grey">Welcome back! Please enter your details.</div>
      </div>
      <div class="q-ma-md">
        <q-input
          v-model="username"
          label="Your Username *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          outlined
        />

        <q-input
          type="password"
          v-model="password"
          label="Your Password *"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || 'Please type your passowrd']"
          outlined
        />
      </div>

      <div class="q-ma-md">
        <q-btn label="Login" type="submit" color="primary" class="full-width" />
        <div class="q-mt-md">Don't have an account? <a href="">Please Register here</a></div>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',

  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },

  methods: {
    async onSubmit() {
      this.loading = true
      try {
        this.$emit('login', {
          username: this.username,
          password: this.password,
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
