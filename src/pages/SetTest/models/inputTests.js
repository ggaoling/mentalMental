export default{
    namespace:'inputTests',

    state:{
        data:{
            question:'',
            answers:[]
        },
    },

    effects:{},

    reducers:{
        save(state,{payload}){
            return {
                ...state,
                ...payload,
            }
        }
    }
}