export default {
    namespace: 'questionTable',
    state: {
        data: [
            {question:'11',qid:101},
            {question:'12',qid:103},
            {question:'13',qid:104},
        ],
        questionName: ''
    },

    effects: {
        *searchByName(_, { call, put }) {
            const result = yield call()
            put({
                type: 'save',
                payload: {
                    data: result
                }
            })
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }

    }
}