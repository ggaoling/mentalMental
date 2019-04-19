import { stringify } from 'qs';
import request from '@/utils/request';

const baseUrl = "http://localhost:8080"

export default {
  //登陆
  login: {
    logon: baseUrl + "/logon",

  },
  //userinfo
  user: {
    queryCurrent: baseUrl + "/user/queryCurrent",//查询当前登陆用户信息
    updateUserInfo: baseUrl + "/user/updateUserInfo",//更新用户信息
    queryAllUsers: baseUrl + "/user/queryAllUsers",//admin查询所有学生列表
  },
  //questionList
  question: {
    addQuestion: baseUrl + "/question/addQuestion",//新增问题 post
    queryQuestionsByName: baseUrl + "/question/queryQuestionsByName",//名字模糊查询问题列表
    selectQuestions:baseUrl + "/question/selectQuestions",
    queryQuestionByQid:baseUrl+"/question/queryQuestionByQid",//根据qid获取问题详情
    updateQuestion:baseUrl+"/question/updateQuestion",
    getSelected:baseUrl+"/question/querySelected"
  },
  //series:
  series:{
    addSeries:baseUrl+"/series/addSeries",
    getSeries:baseUrl+"/series/getSeries"
  },
  //test
  test:{
    getTest:baseUrl + "/test/getTest",
    submitTest:baseUrl + "/test/submitTest",
    getResult:baseUrl+"/test/getResult"
  }


}

//user start
// export async function query() {
//   return request('/api/users');
// }

// export async function queryCurrent() {
//   return request('/api/currentUser');
// }

// //user end

// export async function queryProjectNotice() {
//   return request('/api/project/notice');
// }

// export async function queryActivities() {
//   return request('/api/activities');
// }

// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }

// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

// export async function updateRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'update',
//     },
//   });
// }

// export async function fakeSubmitForm(params) {
//   return request('/api/forms', {
//     method: 'POST',
//     body: params,
//   });
// }

// export async function fakeChartData() {
//   return request('/api/fake_chart_data');
// }

// export async function queryTags() {
//   return request('/api/tags');
// }

// export async function queryBasicProfile() {
//   return request('/api/profile/basic');
// }

// export async function queryAdvancedProfile() {
//   return request('/api/profile/advanced');
// }

// export async function queryFakeList(params) {
//   return request(`/api/fake_list?${stringify(params)}`);
// }

// export async function removeFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'delete',
//     },
//   });
// }

// export async function addFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'post',
//     },
//   });
// }

// export async function updateFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'update',
//     },
//   });
// }

// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }

// export async function fakeRegister(params) {
//   return request('/api/register', {
//     method: 'POST',
//     body: params,
//   });
// }



// export async function getFakeCaptcha(mobile) {
//   return request(`/api/captcha?mobile=${mobile}`);
// }
