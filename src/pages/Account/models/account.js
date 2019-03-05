export default {
  namespace: 'account',

  state: {
    isEdit: false,
    info: null,
  },

  effects: {
    *postAccountInfo(_, { call, put }) {
      const result = yield call();
      yield put({});
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
