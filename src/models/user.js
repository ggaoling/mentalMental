import { query as queryUsers, queryCurrent } from '@/services/api';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateUserInfo(_, { call, put }) {
      const response = yield call();
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
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
