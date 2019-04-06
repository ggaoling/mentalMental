import router from "umi/router";
import api from '@/services/api';
import { GET, POST } from '@/utils/request'

export default {
  namespace: 'takeTests',

  state: {
    questionList: [],
    step: 1,
    totalStep: 0,
    renderList: [],
    result: [],
    finished: false,
    openTest: false
  },

  effects: {
    *fetchList({payload}, { call, put,select }) {
      const uid=localStorage.getItem("uid")
      let params={uid:uid}
      const response = yield call(POST,api.test.getTest,params);
      if (response.error=="success"&&response.result) {
        const totalStep = Math.ceil(response.result.length / 5)
        yield put({
          type: 'save',
          payload: { openTest: true, questionList: response.result, totalStep }
        });
        yield put({
          type: 'initialRenderList'
        })
      }
      else{
        error.message(response.error)
      }
    },

    *postResults(_, { call, put,select }) {
      const takeTests=yield select(state=>state.takeTests)
      const {result}=takeTests;
      const uid=localStorage.getItem("uid");
      const params={resultList:result,uid:Number(uid)}
      const response = yield call(POST,api.test.submitTest,params)
      if (response.error=="success") {
      yield put({ type: 'updateFinishStatus' })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    initialRenderList(state, { payload }) {
      let { questionList } = state
      let renderList = []
      let len=questionList.length<5?questionList.length:5
      for (let i = 0; i < len; i++) {
        let question = questionList.shift()
        renderList.push(question)
      }
      return {
        ...state,
        questionList: questionList,
        renderList: renderList
      }
    },

    /**
     * 
     * @param {*} state 
     * @param {*} param1 
     * 更新下一页的renderList并且删剪处理questionList
     */
    stepNext(state, { payload }) {
      let values = payload
      let { step, questionList, renderList } = state
      step++;
      let newRenderList = []
      values.map((item, index) => {
        let aid = item.aid
        if (!Array.isArray(aid)) {
          let answer = renderList[index].answers.find(elem => elem.aid == aid)
          let binding = answer.binding;
          if (binding) {
            let ind = questionList.findIndex(question => question.qid == binding)
            let question = questionList.splice(ind, 1)[0]
            newRenderList.push(question)
          }
        }
      })
      if (newRenderList.length < 5) {
        while (newRenderList.length < 5 && questionList.length > 0) {
          let question = questionList.shift()
          newRenderList.unshift(question)
        }
      }
      return {
        ...state,
        step,
        renderList: newRenderList,
        questionList
      }
    },
    /**
     * 
     * @param {*} state 
     * @param {*} param1 
     * 只保存选择答案
     */
    saveResult(state, { payload }) {
      let values = payload
      values.forEach(item=>{
        if(!Array.isArray(item.aid)){
          item.aid=[item.aid];
        }
        return item;
      })
      let { result, renderList } = state
      result.push(...values)
      return {
        ...state,
        result
      }
    },
    updateFinishStatus(state, { payload }) {
      return {
        ...state,
        finished: true
      }
    }


  },
};
