
// inertia
import { App, plugin } from '@inertiajs/inertia-vue'
//vuejs
import Vue from 'vue'
// font awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// inertia progress
import { InertiaProgress } from '@inertiajs/progress'




//required files
require('./bootstrap');
require('./fontawesome');
//Vue.prototype.$route = route->We will use it there is an error related to routes with ziggy


// Registering global component
Vue.component('font-awesome-icon', FontAwesomeIcon)

InertiaProgress.init()
Vue.use(plugin)

const el = document.getElementById('app')


  new Vue({
  render: h => h(App, {
    props: {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    },
  }),
}).$mount(el)


/*
import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// inertia progress
import { InertiaProgress } from '@inertiajs/progress'

//required files
require('./bootstrap');
require('./fontawesome');

// Registering global component
Vue.component('font-awesome-icon', FontAwesomeIcon)

InertiaProgress.init()

createInertiaApp({
  //resolve: name => require(`./Pages/${name}`),
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props, plugin }) {
    Vue.use(plugin)

    new Vue({
      render: h => h(App, props),
    }).$mount(el)
  },
}) **/