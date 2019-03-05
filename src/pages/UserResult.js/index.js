import React ,{Component} from 'react'
import { connect } from 'dva';
import {List} from 'antd'

@connect(({userResult,loading})=>({
    userResult,
    loading:loading.effects['userResult/fetchList'],
}))
class UserResult extends Component{

    componentDidMount(){
        const {dispatch}=this.props;
        dispatch({
            type:'userResult/fetchList'
        })
    }

    render(){
        return(
            <List></List>
        )
    }
}



export default UserResult;