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
        score: [],
        changeScore: [],
    },

    subscriptions:{
        setup({dispatch,history}){
            history.listen((location)=>{
                if(location.pathname==="/setTest/inputTests/step1"){
                    dispatch({
                        type:'inputTests/initialData',
                        payload:1
                    })
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
        *initialData({payload},{call,put}){
            const params={qid:payload}
            let response=yield call(POST,api.question.queryQuestionByQid,params);
            response={
                error:'success',
                code:200,
                result:{
                    question:'2',
                    type:2,
                    importance:3,
                    answers:[{answer: "1", binding: "", score: "1"},
                    {answer: "2", binding: "",  score: "2"},]
                }
            }
            if(response.error==="success"){
                const {result}=response;
                yield put({
                    type:'saveData',
                    payload:result
                })
            }
            else{
                message.error(response.error)
            }
        },

        *postData({ payload }, { select, call, put }) {
            let data = yield select(state => state.inputTests.data)
            const{question,type,importance,answers}=data;
            let params = {
                question:question,
                type:type,
                importance:importance,
                answers:answers
            }
            const response = yield call(POST, api.question.addQuestion, params)//发送上传问题api
            if (response.error == "success") {
                router.push('/setTest/inputTests/step3')
                const payload = {
                    data: {
                        question: '',
                        importance: null,
                        type: 1,
                        answers: []
                    },
                    tempBinding: [],
                    score: [],
                    changeScore: [],
                }
                put({
                    type: 'save',
                    payload: payload
                })
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
            let { score } = state;
            score[index] = value;
            return {
                ...state,
                score
            }

        },

        saveScore(state, { payload }) {
            let index = payload
            let { data: { answers }, score } = state;
            answers[index].score = score[index]
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
            answers[payload].binding = value;
            return {
                ...state,
                data: {
                    ...state.data,
                    answers

                }
            }
        },

        cancelBind(state, { payload }) {
            let { data: { answers } } = state;
            answers[payload].binding = '';
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