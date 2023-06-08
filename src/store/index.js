import { createStore } from 'vuex';
import auth from '@/store/modules/auth/index';
import quiz from '@/store/modules/quiz/index';

export default createStore({
  modules: {
    quiz,
    auth
  }
})
