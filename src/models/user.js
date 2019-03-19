import api from '@/services/api';
import { GET, POST } from '@/utils/request'

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put,select }) {
      const currentUser=select(state=>state.user.currentUser)
      let params={id:currentUser.id}
      const response = yield call(GET,api.user.queryCurrent,params);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateUserInfo(_, { call, put,select }) {
      const currentUser=select(state=>state.user.currentUser)
      let params={currentUser:currentUser}
      const response = yield call(GET,api.user.updateUserInfo,params);
      yield put({
        type: '',
      });
    },
  },

  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    saveCurrentUser(state, payload) {
      return {
        ...state,
        currentUser:{
          ...state.currentUser,
          ...payload
        },
      };
    },
  },
};
