export default {
  namespace: 'account',

  state: {
    isEdit: false,
  },

  effects: {
   
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
