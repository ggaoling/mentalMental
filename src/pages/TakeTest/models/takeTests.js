import router from "umi/router";
import api from '@/services/api';
import { GET, POST } from '@/utils/request'

export default {
  namespace: 'takeTests',

  state: {
    questionList: [],
    step: 1,
    renderList: [],
    result: [],
    finished: false,
    sid:-1,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === "/takeTest/taketest") {
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
    *fetchList({ payload }, { call, put, select }) {
      const takeTests = yield select(state => state.takeTests)
       const { pagination, sid } = takeTests
      let params = {sid:sid}
      const response = yield call(POST, api.test.getTest, params);
      if (response.error == "success" && response.result) {
        yield put({
          type: 'save',
          payload: {  questionList: response.result, step: 1, }
        });
        yield put({
          type: 'initialRenderList'
        })
      }
      else {
        error.message(response.error)
      }
    },

    *postResults(_, { call, put, select }) {
      const takeTests = yield select(state => state.takeTests)
      const { result,sid } = takeTests;
      const uid = localStorage.getItem("uid");
      const params = { resultList: result, uid: Number(uid),sid:sid }
      const response = yield call(POST, api.test.submitTest, params)
      if (response.error == "success") {
        yield put({ type: 'updateFinishStatus' })
      }
    },

    *getSeries({ payload }, { call, put, select }) {
      const param={id:localStorage.getItem("uid")}
      let response = yield call(POST, api.series.getSeries,param);

      if (response.error == "success") {
        yield put({
          type: 'save',
          payload: {
            seriesData: response.result
          }
        })
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
    initialRenderList(state, { payload }) {
      let { questionList } = state
      let renderList = []
      let len = questionList.length < 5 ? questionList.length : 5
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
        let aid = item.aid//aid is an array
        if (aid.length == 1) {//多选没有剪枝处理
          let answers = renderList[index].answers;
          answers.forEach(answer => {
            let binding = answer.binding;
            if (binding) {
              let ind = questionList.findIndex(question => question.qid == binding)
              let question = questionList.splice(ind, 1)[0]
              if (answer.aid == aid[0]) { //将选中答案的binding项放入下一页的datalist
                newRenderList.push(question)
              }

              else { //将该问题未选中的binding项以及它的next从questionList中删掉
                let toDeleteAnswers = question.answers;
                toDeleteAnswers.forEach(a => {
                  questionList = questionList.filter(q => q.qid != a.binding)
                })

              }
            }
          })



          // let answer = answers.find(elem => elem.aid == aid[0])
          // let binding = answer.binding;
          // if (binding) {
          //   let ind = questionList.findIndex(question => question.qid == binding)
          //   let question = questionList.splice(ind, 1)[0]
          //   newRenderList.push(question)
          // }
          // let notSelectAnswers = questionList.filter(value => value.qid == qid && value.aid != aid[0]);
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
      values.forEach(item => {
        if (!Array.isArray(item.aid)) {
          item.aid = [item.aid];
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
