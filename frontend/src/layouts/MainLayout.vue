<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> FinShark </q-toolbar-title>
        <q-tabs
          v-model="tab"
          align="left"
          dense
          class="bg-primary text-white"
          active-color="secondary"
          indicator-color="tertiary"
        >
          <q-route-tab name="Home" label="Home" to="/" />

          <q-route-tab name="Login" label="Login" to="/login" />
          <q-route-tab name="Register" label="Register" to="/register" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      tab: null,
    }
  },
}
</script>
