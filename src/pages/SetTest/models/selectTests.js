export default{
    namespace:'selectTests',

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