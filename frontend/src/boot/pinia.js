import { createPinia } from 'pinia'
import { defineBoot } from '#q-app/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ app }) => {
  // something to do
  const pinia = createPinia()
  app.use(pinia)
})
