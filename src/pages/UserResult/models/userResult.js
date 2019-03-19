import api from '@/services/api'
import {GET,POST} from '@/utils/request'
export default {

  namespace: 'userResult',

  state: {
    data: [],
  },

  effects: {
    *fetchList(_, { call, put ,select}) {
      const result = yield call(GET,api.user.queryAllUsers);
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
