import api from '@/services/api';
import { GET, POST } from '@/utils/request'

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
        *searchByName(_, { call, put ,select}) {
            let questionTable=select(state=>state.questionTable)
            let params={questionName:questionTable.questionName}
            const result = yield call(GET,api.question.queryQuestionsByName,params)
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