import React, { Component } from 'react'
import { connect } from 'dva'
import { Card } from 'antd'
import QuestionTable from '../components/QuestionTable'
import router from 'umi/router'

class UpdateQuestion extends Component {

    handleUpdateDetail=(record)=>{
        const {qid}=record;
        router.replace(`/setTest/inputTests/step1?qid=${qid}`);
    }
    render() {
        let action={
            name:'修改',
            func:this.handleUpdateDetail
        }
        return (
            <Card>
                <QuestionTable action={action}/>
            </Card>
            )
        }
}

export default connect(({questionTable})=>({questionTable}))(UpdateQuestion)