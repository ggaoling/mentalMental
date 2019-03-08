export default {
    namespace: 'inputTests',

    state: {
        data: {
            question: '123',
            answers: [{answer:'1',binding:'',key:0},
            {answer:'2',binding:'',key:1}]
        },
        inputs: []
    },

    effects: {

        *postData({payload},{select,call,put}){
            const params=select(state=>state.data)
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
    
        saveInput(state, {payload} ) {
            let{key,value}=payload
            let{inputs}=state
            inputs[key]=value;
            return {
                ...state,
                inputs
            }
        },
    
        bindNext(state, { payload }) {
            let value = state.inputs[payload];
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

        cancelBind(state,{payload}){
            let {data:{answers}}=state;
            answers[payload].binding='';
            return {
                ...state,
                data:{
                    ...state.data,
                    answers
                }
            }
        }





    },
    

}