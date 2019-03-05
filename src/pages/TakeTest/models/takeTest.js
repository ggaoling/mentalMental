export default {
  namespace: 'takeTest',

  state: {
    questionList: null,
    step: 1,
  },

  effect: {
    *fetchList(_, { call, put }) {
      const result = yield call();
      yield put({
        type: 'save',
        payload: result,
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
