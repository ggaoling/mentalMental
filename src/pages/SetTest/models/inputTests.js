import router from 'umi/router';
import api from '@/services/api';
import { GET, POST } from '@/utils/request'
import { message } from 'antd'
export default {
    namespace: 'inputTests',

    state: {
        data: {
            question: '',
            importance: null,
            type: 1,
            answers: []
        },
        tempBinding: [],
        qratio: [],
        changeScore: [],
        qid: null,
        id: 1,
        fixId: 0,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === "/setTest/inputTests/step1") {
                    if (location.query && location.query.qid) {
                        dispatch({
                            type: 'initialData',
                            payload: location.query.qid
                        })
                        dispatch({
                            type: 'save',
                            payload: { qid: location.query.qid }
                        })
                    }
                    else {
                        const payload = {
                            data: {
                                question: '',
                                importance: null,
                                type: 1,
                                answers: []
                            },
                            tempBinding: [],
                            qratio: [],
                            changeScore: [],
                            id: 1,
                            fixId: 0,
                            qid: null
                        }
                        dispatch({
                            type: 'save',
                            payload: payload
                        })
                    }
                }
            }
            )
        }
    },

    effects: {
        /**
         * 
         * @param {*} param0 
         * @param {*} param1 
         * 修改问题详情时根据qid获取问题详情 注入state的data
         */
        *initialData({ payload }, { call, put }) {
            const params = { qid: payload }
            let response = yield call(POST, api.question.queryQuestionByQid, params);
            if (response.error === "success") {
                const { result } = response;
                const answers = result.answers;
                let qratio = []
                let tempBinding = []
                answers.forEach(element => {
                    qratio.push(element.qratio);
                    tempBinding.push(element.binding)
                });
                yield put({
                    type: 'saveData',
                    payload: result
                })
                yield put({
                    type: 'save',
                    payload: {
                        qratio: qratio,
                        tempBinding: tempBinding,
                        id: answers.length-1,
                        fixId: answers.length
                    }
                })
            }
            else {
                message.error(response.error)
            }
        },

        *postData({ payload }, { select, call, put }) {
            let inputTests = yield select(state => state.inputTests)
            let { data, qid } = inputTests
            const { question, type, importance, answers } = data;
            let params = {
                question: question,
                type: type,
                importance: importance,
                answers: answers
            }
            //修改数据
            let url=api.question.addQuestion
            if (qid) {
                url=api.question.updateQuestion
                params = { ...params, qid: qid }
               
            }
            let response=yield call(POST, url, params)
           
            if (response.error == "success") {
                console.log('success')
                const payload = {
                    data: {
                        question: '',
                        importance: null,
                        type: 1,
                        answers: []
                    },
                    tempBinding: [],
                    qratio: [],
                    changeScore: [],
                }
                put({
                    type: 'save',
                    payload: payload
                })
                router.push('/setTest/inputTests/step3')
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
        saveData(state, { payload }) {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload
                }
            }
        },


        //保存输入的要绑定的问题id
        saveBindingInput(state, { payload }) {
            let { key, value } = payload
            let { tempBinding } = state
            tempBinding[key] = value;
            return {
                ...state,
                tempBinding
            }
        },

        //更新score status
        updateScoreChange(state, { payload }) {
            let index = payload
            let { changeScore } = state;
            let status = changeScore[index]
            changeScore[index] = !status
            return {
                ...state,
                changeScore
            }
        },

        saveScoreInput(state, { payload }) {
            let { value, index } = payload;
            let { qratio } = state;
            qratio[index] = value;
            return {
                ...state,
                qratio
            }

        },

        saveScore(state, { payload }) {
            let index = payload
            let { data: { answers }, qratio } = state;
            answers[index].qratio = qratio[index]
            return {
                ...state,
                data: {
                    ...state.data,
                    answers
                }
            }
        },

        //绑定qid
        bindNext(state, { payload }) {
            let value = state.tempBinding[payload];
            let { data: { answers } } = state
            let regex=/^\d+$/
            if(regex.test(value)){
                answers[payload].binding =Number(value);
                return {
                    ...state,
                    data: {
                        ...state.data,
                        answers
    
                    }
                }
            }
           
        },

        cancelBind(state, { payload }) {
            let { data: { answers } } = state;
            answers[payload].binding =0;
            return {
                ...state,
                data: {
                    ...state.data,
                    answers
                }
            }
        }

    },


}