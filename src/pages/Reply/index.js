import React, { Component } from 'react'
import { Card, Input, Switch, Button, List } from 'antd'
import { connect } from 'dva';
class Reply extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reply/getData'
        })
    }

    handleChangeInput = (aid, value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'reply/saveEditData',
            payload: {
                aid: aid,
                talk: value
            }
        })
    }
    handlePost = (aid) => {
        console.log('------------------',aid)
        // debugger
        const { dispatch, reply: { editData } } = this.props;
        const talk = editData[aid];
        dispatch({
            type: 'reply/postData',
            payload: {
                aid: aid,
                talk: talk
            }
        })
    }
    render() {
        const { reply } = this.props;
        const { data } = reply
        return (
            <Card>
                <List itemLayout="vertical"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item actions={[<Button onClick={e => this.handlePost(item.aid)}>回复</Button>]}>
                            问题：{item.talk}
                            <br/>
                            <Input.TextArea rows={3} style={{ width: '60%', marginTop:'30px'  }} onChange={e => this.handleChangeInput(item.aid, e.target.value)} />
                        </List.Item>
                    )}
                />
            </Card>

        )
    }
}

export default connect(({ reply }) => ({
    reply
}))(Reply)
