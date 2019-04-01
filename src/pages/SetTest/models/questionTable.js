import api from '@/services/api';
import { GET, POST } from '@/utils/request'

export default {
    namespace: 'questionTable',
    state: {
        data: [
            // {question:'11',qid:101},
            // {question:'12',qid:103},
            // {question:'13',qid:104},
        ],
        questionName: '',
        pagination:{
            pageNo:1,
            pageSize:10,
            total:0
        },
    },

    effects: {
        *searchByName({payload}, { call, put ,select}) {
            let questionTable=yield select(state=>state.questionTable)
            const{questionName,pagination}=questionTable
            const params={questionName:questionName,pageNo:pagination.pageNo-1}
            const response = yield call(POST,api.question.queryQuestionsByName,params)
            yield put({
                type: 'save',
                payload: {
                    data: response.result.content,
                    pagination:{
                        ...pagination,
                        total:response.result.totalElements
                    },
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