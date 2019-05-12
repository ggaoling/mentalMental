export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/account' },
      //user&admin
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        authority: ['admin', 'user'],
        component: './Account/Settings/Info',
      },

      //user
      {
        path: '/takeTest',
        icon: 'form',
        name: 'takeTest',
        authority: ['user'],
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/takeTest',
            redirect: '/takeTest/testList'
          },
          {
            path: '/takeTest/testList',
            name: 'testList',
            component: './TakeTest/SeriesTable'
          },
          {
            path: '/takeTest/taketest',
            name: 'taketest',
            component: './TakeTest'
          }


        ]
      },
      {
        path: '/getAdvice',
        name: '问题解答',
        icon:'question-circle',
        authority: ['user'],
        component: './GetAdvice'
      },

      //admin
      {
        path: '/setTest',
        icon: 'form',
        name: 'setTest',
        authority: ['admin'],
        routes: [
          {
            path: '/setTest/inputTests',
            name: 'inputTests',
            // icon: 'upload',
            authority: ['admin'],
            component: './SetTest/InputTests',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/setTest/inputTests',
                redirect: '/setTest/inputTests/step1'
              },
              {
                path: '/setTest/inputTests/step1',
                name: 'step1',
                component: './SetTest/InputTests/Step1',
              },
              {
                path: '/setTest/inputTests/step2',
                name: 'step2',
                component: './SetTest/InputTests/Step2',
              },
              {
                path: '/setTest/inputTests/step3',
                name: 'step3',
                component: './SetTest/InputTests/Step3',
              },
            ]
          },
          {
            path: '/setTest/selectTests',
            name: 'selectTests',
            hideChildrenInMenu: true,
            authority: ['admin'],
            routes: [
              {
                path: '/setTest/selectTests',
                redirect: '/setTest/selectTests/series'
              },
              {
                path: '/setTest/selectTests/series',
                name: 'series',
                component: './SetTest/SelectTests/SeriesTable'
              },
              {
                path: '/setTest/selectTests/select',
                name: 'select',
                component: './SetTest/SelectTests',
              },
              {
                path: '/setTest/selectTests/selectSuccess',
                name: 'selectSuccess',
                component: './SetTest/SelectTests/SelectSuccess',
              },
            ]
          },
          {
            path: '/setTest/updateQuestion',
            name: 'updateQuestion',
            component: './SetTest/UpdateQuestion',
            authority: ['admin'],
          },
          {
            path: '/setTest/setLevel',
            name: '设置规则',
            component: './SetTest/SetLevel'
          },
        ],

      },
      {
        path:'/reply',
        name:'答疑解惑',
        authority:['admin'],
        icon:"info-circle",
        component:'./Reply',
        authority: ['admin'],
      },
      {
        path: '/userResult',
        icon: 'inbox',
        name: 'userResult',
        authority: ['admin'],
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/userResult',
            redirect: '/userResult/resultList'

          },
          {
            path: '/userResult/result',
            name: 'result',
            component: './UserResult/Result'

          },
          {
            path: '/userResult/resultList',
            name: 'resultList',
            component: './UserResult',
          }
        ]

      },
      {
        path: '/commonQuestion',
        icon: 'input',
        name: '分享常规问题',
        authority: ['admin'],
        component: './Common',
      },
      {
        path: '/exception',
        hideChildrenInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',

          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
