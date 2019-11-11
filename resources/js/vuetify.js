import Vue from 'vue';
import Vuetify from 'vuetify'; // Important! Not vuetify/lib, but just vuetify!!! 
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {};

export default new Vuetify(opts);