import React, { Component } from 'react'
import { Card, Input, Switch, Button } from 'antd'
import { connect } from 'dva';
class GetAdvice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameless: true,
            talk: ''
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'getAdvice/getData'
        })
    }

    handlePost = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'getAdvice/postAsk',
            payload: {
                uid: localStorage.getItem("uid"),
                talk: this.state.talk
            }
        })
        this.setState({
            talk: ''
        })
    }
    render() {
        const { getAdvice } = this.props;
        const { data } = getAdvice
        return (
            <Card>
                <Card title="常规问题" style={{ marginBottom: '40px' }}>
                    <p> 问：123？</p>
                    <p>答：123.</p>
                </Card>
                <Card title="我的提问" style={{ marginBottom: '40px' }}>
                    {data.map(ele => {
                        return (
                            <Card key={ele.aid} bordered={false}>
                                <p> 问：{ele.talk}</p>
                                {ele.reply ? <p>答：{ele.reply}</p> : '暂无答复'}
                            </Card>
                        )
                    }
                    )}

                </Card>
                <Card bordered={false} title="提问">
                    <Input.TextArea rows={3} style={{ width: '60%', marginLeft: '20%', marginBottom: '40px' }} value={this.state.talk} onChange={e => this.setState({ talk: e.target.value })} />
                    <br />
                    <span style={{ marginLeft: '40%',  }}>
                        匿名：<Switch  checkedChildren="匿名" defaultChecked onClick={checked => { this.setState({ nameless: checked }) }} />
                    </span>
                    <br />
                    <Button style={{ marginLeft: '40%',marginTop: '40px' }} type="primary" onClick={e => this.handlePost()}>发送</Button>
                </Card>
            </Card>

        )
    }
}

export default connect(({ getAdvice }) => ({
    getAdvice
}))(GetAdvice)

// export default connect(({ getAdvice }) => ({ getAdvice }))(GetAdvice)