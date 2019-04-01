import api from '@/services/api';
import { GET, POST } from '@/utils/request'

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put, select }) {
      const uid=window.localStorage.getItem("uid");
      let params = { uid: uid }
      const response = yield call(POST, api.user.queryCurrent, params);
      if (response.error == "success") {
        const{result}=response
        yield put({
          type: 'saveCurrentUser',
          payload:result,
        });
      }

    },
    *updateUserInfo({payload}, { call, put, select }) {
      const currentUser =yield select(state => state.user.currentUser)
      let params = { ...currentUser,...payload }
      const response = yield call(POST, api.user.updateUserInfo, params);
      yield put({type:'fetchCurrent'});
    },
  },

  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    saveCurrentUser(state, {payload}) {
      return {
        ...state,
        currentUser:{...payload} 
      };
    },
  },
};
