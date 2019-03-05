export default{
    namespace:'userResult',

    state:{
        resultList:[]
    },

    effects:{
        *fetchList(_,{call,put}){

        }
    },

    reducers:{
        save(state,{payload}){
            return {
                ...state,
                ...payload
            }
        }
    }
}