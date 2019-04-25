
import api from '@/services/api';
import { GET, POST } from '@/utils/request'
import{message} from 'antd'
export default {
    namespace: 'getAdvice',
    state: {
        data:[]

    },
    effects: {
        *postAsk({ payload }, { call, put }) {
            const response = yield call(POST, api.advice.studentAsk, payload);
            if(response.success==="success"){
                message.success("发送成功");
            }
        },
        *getData({ payload }, { call, put }) {
            const params={uid:localStorage.getItem("uid")}
            const response = yield call(POST, api.advice.studentQuery,params)
            yield put({
                type:'save',
                payload:{
                    data:response.result
                }
            })
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    }
}