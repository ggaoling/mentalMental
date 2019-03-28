import api from '@/services/api'
import {GET,POST} from '@/utils/request'
import {message} from 'antd'
export default {

  namespace: 'userResult',

  state: {
    data: [],
  },

  effects: {
    *fetchList(_, { call, put ,select}) {
      const response = yield call(POST,api.user.queryAllUsers);
      if(response.error=="success"){
        const {result}=response;
        yield put({
          type: 'saveData',
          payload:result ,
        });
      }
      else{
        message.error(response.error)
      }
      
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, { payload }) {
      console.log("123")
      return {
        ...state,
        data:payload
      };
    },
  },
  

};
