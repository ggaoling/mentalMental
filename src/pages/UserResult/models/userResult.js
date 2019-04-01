import api from '@/services/api'
import { GET, POST } from '@/utils/request'
import { message } from 'antd'
export default {

  namespace: 'userResult',

  state: {
    data: [],
    pagination: {
      pageNo: 1,
      pageSize: 10,
      total: 0
    },
  },

  effects: {
    *fetchList({payload}, { call, put, select }) {
      const userResult  = yield select(state => state.userResult)
      const { pagination } = userResult
      const params = { pageNo: pagination.pageNo - 1 }
      const response = yield call(POST, api.user.queryAllUsers, params);
      if (response.error == "success") {
        const { result } = response;
        yield put({
          type: 'save',
          payload: {
            data: result.content,
            pagination: {
              ...pagination,
              total: result.totalElements
            }
          }
        });
      }
      else {
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
      return {
        ...state,
        data: payload
      };
    },
  },


};
