import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form, List, Divider, Button } from 'antd';
import QuestionTable from '../components/QuestionTable'

class SelectTests extends Component {
    constructor(props) {
        super(props)
    }

    handleRemoveOne = (record) => {
        const{dispatch}=this.props
        dispatch({
            type:'selectTests/removeOne',
            payload:record
        })
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'selectTests/postData'
        })
    }
    render() {
        const { selectTests } = this.props
        const { data } = selectTests
        return (
            <Card bordered={false}>
                <Card style={{marginBottom:'30px'}}>
                    <List
                        size="default"
                        itemLayout="horizontal"
                        header='已选择的题目'
                        bordered dataSource={data}
                        renderItem={item => (<List.Item key={item.qid} extra={<a style={{marginLeft: '80%'}}onClick={e => this.handleRemoveOne(item)}>移除这一项</a>}>{item.qid}<Divider type='vertical'></Divider>{item.question}</List.Item>)}>
                    </List>
                    <Button type="primary" style={{ margin: '10px 45%' }} onClick={e => this.handleSubmit()}>提交</Button>
                </Card>
                <Card>
                    <QuestionTable canSelect={true} />
                </Card>
            </Card>

        )

    }
}

export default connect(({ selectTests }) => ({
    selectTests
}))(SelectTests)