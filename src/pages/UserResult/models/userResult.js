export default {
  namespace: 'userResult',

  state: {
    data: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const result = yield call();
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
