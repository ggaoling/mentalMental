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
    *fetchList(_, { call, put,select }) {
      const currentUser=select(state=>state.user.currentUser)
      const uid=currentUser.uid
      let params={uid:uid}
      // const result = yield call(GET,api.test.getTest,params);
      const result = {
        questionList: [
          {
            qid: '01',
            question: 'qqqqqqqqqqqqqqqqqqqq1',
            importance: 1,
            type: 2,
            answers: [{ qoption: '1', binding: '', aid: 10, score: 10 },
            { qoption: '2', binding: '', aid: 11, score: 20 },
            { qoption: '1', binding: '', aid: 12, score: 30 },
            { qoption: '1', binding: '', aid: 13, score: 40 },]
          },
          {
            qid: '02',
            question: 'qqqqqqqqqqqqqqqqqqqq2',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 20, score: 10 },
            { qoption: '2', binding: '07', aid: 21, score: 20 },
            { qoption: '1', binding: '', aid: 22, score: 30 },
            { qoption: '1', binding: '011', aid: 23, score: 40 },]
          },
          {
            qid: '03',
            question: 'qqqqqqqqqqqqqqqqqqqq3',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 30, score: 10 },
            { qoption: '2', binding: '', aid: 31, score: 20 },
            { qoption: '1', binding: '', aid: 32, score: 30 },
            { qoption: '1', binding: '', aid: 33, score: 40 },]
          },
          {
            qid: '04',
            question: 'qqqqqqqqqqqqqqqqqqqq4',
            importance: 1,
            type: 2,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '05',
            question: 'qqqqqqqqqqqqqqqqqqqq6',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '06',
            question: 'qqqqqqqqqqqqqqqqqqqq7',
            importance: 1,
            type: 2,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '07',
            question: 'qqqqqqqqqqqqqqqqqqqq8',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '08',
            question: 'qqqqqqqqqqqqqqqqqqqq9',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '09',
            question: 'qqqqqqqqqqqqqqqqqqqq10',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '10',
            question: 'qqqqqqqqqqqqqqqqqqqq11',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '011',
            question: 'qqqqqqqqqqqqqqqqqqqq12',
            importance: 1,
            type: 1,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
          {
            qid: '012',
            question: 'qqqqqqqqqqqqqqqqqqqq13',
            importance: 1,
            type: 2,
            answers: [{ qoption: '1', binding: '', aid: 0, score: 10 },
            { qoption: '2', binding: '', aid: 1, score: 20 },
            { qoption: '1', binding: '', aid: 2, score: 30 },
            { qoption: '1', binding: '', aid: 3, score: 40 },]
          },
        ],
      }
      if (result.questionList.length > 0) {
        const totalStep = Math.ceil(result.questionList.length / 5)
        yield put({
          type: 'save',
          payload: { openTest: true, questionList: result.questionList, totalStep }
        });
      }
    },

    *postResults(_, { call, put }) {
      // const result = yield call()
      // if (result.success) {
      yield put({ type: 'updateFinishStatus' })
      // }
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
      for (let i = 0; i < 5; i++) {
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
