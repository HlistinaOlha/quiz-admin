import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from '@/components/UI/BaseCard'
import BaseButton from '@/components/UI/BaseButton'
import BaseSpinner from '@/components/UI/BaseSpinner'
import BaseTableHeading from '@/components/UI/BaseTableHeading'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BaseBadge from '@/components/UI/BaseBadge'
import BaseWidget from '@/components/UI/BaseWidget'
import BaseHeading from '@/components/UI/BaseHeading'
import BaseCheckbox from '@/components/UI/BaseCheckbox'

import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/global.scss'

const BaseDialog = defineAsyncComponent(() => import('@/components/UI/BaseDialog'))
const BaseDateInput = defineAsyncComponent(() => import('@/components/UI/BaseDateInput'))
const Paginate = defineAsyncComponent(() => import("vuejs-paginate-next"));

export const handleErrors = (responseData, errorMessage) => {
  let errors = ''
  responseData.forEach((data, index) => {
    errors += data.message
    if (index !== responseData.length - 1) {
      errors += ','
    }
  })
  throw new Error(errors || errorMessage)
}

export const setPageInfo = (commit, responseData) => {
  const currentPage = responseData.pagination.currentPage
  const totalPages = responseData.pagination.totalPages

  commit('setPageInfo', {
    currentPage: totalPages === currentPage && currentPage !== 0 ? currentPage - 1 : currentPage,
    pageSize: responseData.pagination.pageSize,
    totalPages: totalPages
  })
}

library.add(fas)

createApp(App)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('base-spinner', BaseSpinner)
  .component('base-dialog', BaseDialog)
  .component('base-badge', BaseBadge)
  .component('base-widget', BaseWidget)
  .component('base-checkbox', BaseCheckbox)
  .component('base-heading', BaseHeading)
  .component('base-date-input', BaseDateInput)
  .component('base-table-heading', BaseTableHeading)
  .component('paginate', Paginate)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')

