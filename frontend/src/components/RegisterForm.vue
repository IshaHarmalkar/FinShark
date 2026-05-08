<template>
  <div class="q-pa-md flex center">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md bg-white border">
      <div>
        <div class="text-h4">Create an account</div>
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
          type="email"
          v-model="email"
          label="Your Email *"
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
        <q-btn label="Register" type="submit" color="primary" class="full-width" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',

  data() {
    return {
      username: '',
      email: '',
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
          email: this.email,
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
