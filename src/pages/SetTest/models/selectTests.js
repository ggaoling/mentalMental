import api from '@/services/api';
import { GET, POST } from '@/utils/request'

export default {
    namespace: 'selectTests',

    state: {
        data: []
    },

    effects: {
        *postData(_, { put, call, select }) {
            let data = select(state => state.data)
            let params={data:data}
            let result = yield call(POST,api.question.selectQuestions,params)
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
        },
        removeOne(state, { payload }) {
            let key = payload.qid
            let { data } = state
            let index = data.findIndex(item => item.qid == key)
            data.splice(index, 1)
            return {
                ...state,
                data
            }
        }
    }
}