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
      { path: '/', redirect: '/account/settings' },
      //user&admin
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
          },
        ],
      },

      //user
      {
        path: '/takeTest',
        icon: 'form',
        name: 'takeTest',
        authority: ['user'],
        component: './TakeTest',
      },
      // {
      //   path: 'result',
      //   name: 'result',
      //   component: './Result/Success'
      // },

      //admin
      {
        path: '/setTest',
        icon: 'form',
        name: 'setTest',
        authority: ['admin'],
        // hideChildrenInMenu:true,
        routes: [
          {
            path: '/setTest/inputTests',
            name: 'inputTests',
            icon: 'upload',
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
            component: './SetTest/SelectTests'
          },
          {
            path: '/setTest/updateQuestion',
            name: 'updateQuestion',
            component: './SetTest/UpdateQuestion'
          },
        ]
      },
      {
        path: '/userResult',
        icon: 'inbox',
        name: 'userResult',
        authority: ['admin'],
        component: './UserResult'
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
