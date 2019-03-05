import React ,{Component} from 'react'
import { connect } from 'dva';

class InputTests extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>iii</div>
        )
    }
}

export default connect(({inputTests})=>({inputTests}))(InputTests)