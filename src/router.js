/**
 * Router, for vue-router
 * Client side routing
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Used components
import App from 'components/App.vue';
import SamplesIndex from 'components/Samples/Index.vue';
import Hello from 'components/Samples/Hello.vue';
import TablePage from 'components/Samples/Table.vue';

export default new VueRouter({
  routes: [
    { path: '/app', component: App,
      children: [
        { path: 'samples', component: SamplesIndex,
          children: [
            { path: 'hello', component: Hello },
            { path: 'table', component: TablePage },
          ],
        },
      ],
    },
    { path: '*',
      component: Hello,
    },
  ],
});
