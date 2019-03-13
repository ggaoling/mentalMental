export default {
    namespace: 'selectTests',

    state: {
        data: []
    },

    effects: {
        *postData(_, { put, call, select }) {
            let data = select(state => state.data)
            let result = yield call()
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        addOne(state, { payload }) {
            let { data } = state
            data.push(payload)
            return {
                ...state,
                data

            }
        }
    }
}