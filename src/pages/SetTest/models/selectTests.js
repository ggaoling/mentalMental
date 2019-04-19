import api from '@/services/api';
import { GET, POST } from '@/utils/request'
import { message } from 'antd'
import router from 'umi/router';

export default {
    namespace: 'selectTests',

    state: {
        data: [],
        selectStatus: false,
        selectedData: [],
        pagination: {
            pageNo: 1,
            pageSize: 10,
            total: 0,

        },
        seriesData: [],
        sid:-1,
        addNewStatus:false,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === "/setTest/selectTests/select") {
                    if (location.query && location.query.sid) {
                        dispatch({
                            type: 'save',
                            payload: { sid: location.query.sid }
                        })
                    }
                }
            })
        }
    },

    effects: {
        *postData({ payload }, { put, call, select }) {
            let selectTests = yield select(state => state.selectTests)
            let { data,sid } = selectTests
            let para = data.map(ele => {
                let obj = {}
                obj.qid = ele.qid
                return obj
            })
            const params = { qidList: para,sid:sid}
            let response = yield call(POST, api.question.selectQuestions, params)
            if (response.error == "success") {
                router.push("/setTest/selectTests/selectSuccess")
            }
            else {
                message.error(response.error)
            }
        },
        *getSelected({ payload }, { call, put, select }) {
            const selectTests = yield select(state => state.selectTests)
            const { pagination, sid } = selectTests
            const params = { pageNo: pagination.pageNo - 1, pageSize: pagination.pageSize, sid: sid }
            let response = yield call(POST, api.question.getSelected, params)

            if (response.error == "success") {
                let selectStatus = false;
                // if (Array.isArray(response.result.content) && response.result.content.length > 0) {
                //     selectStatus = false
                // }
                yield put({
                    type: 'save',
                    payload: {
                        data:response.result.content,
                        selectedData: response.result.content,
                        selectStatus: selectStatus,
                        pagination: {
                            ...pagination,
                            total: response.result.totalElements
                        }
                    }
                })
            }
        },
        *getSeries({ payload }, { call, put, select }) {
            let response = yield call(POST, api.series.getSeries);
           
            if (response.error == "success") {
                yield put({
                    type: 'save',
                    payload: {
                        seriesData: response.result
                    }
                })
            }
        },
        *addSeries({payload},{call,put}){
            console.log(payload)
            const params={...payload}
            let response=yield call(POST,api.series.addSeries,params);
            if(response.error=="success"){
               
                yield put({
                    type:'changeSelectStatus'
                })
            }
            else{
                console.log(response.error)
            }
            yield put({
                type:'getSeries'
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
        },
        changeSelectStatus(state, { payload }) {
            const { selectStatus } = state;
            return {
                ...state,
                selectStatus: !selectStatus
            }
        },

    }
}