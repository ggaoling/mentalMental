export default{
    namespace:'inputTests',

    state:{},

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