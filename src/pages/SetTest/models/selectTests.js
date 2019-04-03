import api from '@/services/api';
import { GET, POST } from '@/utils/request'
import { message } from 'antd'
import router from 'umi/router';

export default {
    namespace: 'selectTests',

    state: {
        data: []
    },

    effects: {
        *postData({ payload }, { put, call, select }) {
            let selectTests = yield select(state => state.selectTests)
            let { data } = selectTests
            let para=data.map(ele => {
                let obj={}
                obj.qid=ele.qid 
                return obj
            })
            const params={selectList:para}
            console.log(params)
            let response = yield call(POST, api.question.selectQuestions, params)
            if (response.error == "success") {
                router.push("/setTest/selectTests/selectSuccess")
            }
            else {
                message.error(response.error)
            }
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