
import api from '@/services/api';
import { GET, POST } from '@/utils/request'
import{message} from 'antd'
export default {
    namespace: 'reply',
    state: {
        data:[],
        editData:[]
    },
    effects: {
        *postData({ payload }, { call, put }) {
            const response = yield call(POST, api.advice.teacherReply, payload);
            if(response.error==="success"){
                message.success("回复成功");
                yield put({
                    type:'getData'
                })
            }
        },
        *getData({ payload }, { call, put }) {
            const response = yield call(POST, api.advice.teacherQuery)
            yield put({
                type:'save',
                payload:{
                    data:response.result,
                   
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
        },
        saveEditData(state,{payload}){
            let {aid,talk}=payload
            let {editData}=state
            editData[aid]=talk;
            return{
                ...state,
                editData:editData
            }
        }
    }
}