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
                    <p> 问：如何排解压力？</p>
                    <p>答：* 提前做准备。如果你能预见压力，比如你知道每次期中考试你都会紧张，那么你就有提前做准备的必要了。当期中考试来临时，提前几天开始复习，而且要在你注意力最集中的时刻复习。不过也要去参加一些社交活动，偶尔给自己放放假。提前做准备有时能完全防止压力。</p>
                    <p>* 有条理地做事。所要完全的任务要按重要性从高到低排序，先做重要的事。买健康保险和买最新足球赛的门票这两件事根本不能相提并论，要分清轻重缓急。</p>
                    <p>* 为可能给你带来压力的事情做好准备。如果你眼见有让你压力山大的事情要发生，一定要不惜一切做好准备。这样，等这件事到来，比如做报告，你就会觉得你已经有备无患了。</p>
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
                <Card bordered={false} title="提问(匿名提问他人看不到您的名字)">
                    <Input.TextArea rows={3} style={{ width: '60%', marginLeft: '20%', marginBottom: '40px' }} value={this.state.talk} onChange={e => this.setState({ talk: e.target.value })} />
                    <br />
                    <span style={{ marginLeft: '40%', }}>
                        匿名：<Switch checkedChildren="匿名" defaultChecked onClick={checked => { this.setState({ nameless: checked }) }} />
                    </span>
                    <br />
                    <Button style={{ marginLeft: '40%', marginTop: '40px' }} type="primary" onClick={e => this.handlePost()}>发送</Button>
                </Card>
            </Card>

        )
    }
}

export default connect(({ getAdvice }) => ({
    getAdvice
}))(GetAdvice)

// export default connect(({ getAdvice }) => ({ getAdvice }))(GetAdvice)