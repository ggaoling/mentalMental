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
      total: 0,
      showSizeChanger: true,

    },
    sid: -1,
    uid: 0,
    resultData: null,
    radioData: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === "/userResult/result") {
          if (location.query && location.query.sid && location.query.uid) {
            dispatch({
              type: 'save',
              payload: { sid: location.query.sid, uid: location.query.uid }

            })
            dispatch({
              type: 'getResult'
            })
          }
        }
      })
    }
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const userResult = yield select(state => state.userResult)
      const { pagination } = userResult
      const params = { pageNo: pagination.pageNo - 1, pageSize: pagination.pageSize }
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
    *getRadioData({ payload }, { call, put }) {
      let response = yield call(POST, api.series.getSeries);
      if (response.error == "success") {
        yield put({
          type: 'save',
          payload: {
            radioData: response.result
          }
        })
      }
    },
    *getResult({ payload }, { call, put, select }) {
      const userResult = yield select(state => state.userResult)
      const { uid, sid } = userResult
      const params = payload ? payload : { uid: uid, sid: sid };
      try {
        
        const response = yield call(POST, api.test.getResult, params);
        if (response.error == "success") {
          yield put({
            type: 'save',
            payload: {
              resultData: response.result
            }
          })
        }
        else {
          message.error(response.error)
        }
      }
      catch (e) { }
    }

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
