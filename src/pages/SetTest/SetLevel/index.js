import React, { Component } from 'react'
import { connect } from '../../../../node_modules/dva';
import { Card, Button, List, Input } from 'antd'

class SetLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editStatus: false,
            level: [],
            description: []
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectTests/getSeries'
        })

    }
    changeEditStatus = () => {
        const { editStatus } = this.state
        this.setState({
            editStatus: !editStatus
        })
    }

    render() {
        const { selectTests: { seriesData } } = this.props;
        const { editStatus, level, description } = this.state
        return (
            <Card>
                {
                    editStatus ? (
                        <div>
                            <div style={{paddingBottom:'20px'}}>
                                第一级别：0~<Input style={{ width: '5%' }} onChange={e => {
                                    level.push(e.target.value)
                                    this.setState({
                                        level: level
                                    })
                                }} />
                                <div style={{ padding: '20 5' }}>
                                    描述：<Input.TextArea rows={4} onChange={e => {
                                        description.push(e.target.value)
                                        this.setState({
                                            description: description
                                        })
                                    }} />
                                </div>

                            </div>
                            <div style={{paddingBottom:'20px'}}>
                                第二级别：<Input style={{ width: '5%' }} onChange={e => {
                                    level.push(e.target.value)
                                    this.setState({
                                        level: level
                                    })
                                }} />
                                <div style={{ padding: '20 5' }}>
                                    描述：<Input.TextArea rows={4} onChange={e => {
                                        description.push(e.target.value)
                                        this.setState({
                                            description: description
                                        })
                                    }} />
                                </div>
                            </div>
                            <div style={{paddingBottom:'20px'}}>
                                第三级别：<Input style={{ width: '5%' }} onChange={e => {
                                    level.push(e.target.value)
                                    this.setState({
                                        level: level
                                    })
                                }} />
                                <div style={{ padding: '20 5' }}>
                                    描述：<Input.TextArea rows={4} onChange={e => {
                                        description.push(e.target.value)
                                        this.setState({
                                            description: description
                                        })
                                    }} />
                                </div>
                            </div>
                            <div style={{paddingBottom:'20px'}}>
                                第四级别：<Input style={{ width: '5%' }} onChange={e => {
                                    level.push(e.target.value)
                                    this.setState({
                                        level: level
                                    })
                                }} />
                                <div style={{ padding: '20 5' }}>
                                    描述：<Input.TextArea rows={4} onChange={e => {
                                        description.push(e.target.value)
                                        this.setState({
                                            description: description
                                        })
                                    }} />
                                </div>
                            </div>
                            <Button type="primary">提交</Button>
                        </div>) :
                        (
                            <div>

                                <List
                                    header="问卷列表"
                                    bordered
                                    itemLayout="horizontal"
                                    dataSource={seriesData}
                                    renderItem={item => (
                                        <List.Item actions={[<Button onClick={e => this.changeEditStatus()}>设置规则</Button>]}>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={item.description} />
                                        </List.Item>
                                    )} />

                            </div>

                        )
                }
            </Card>
        )
    }
}



export default connect(({ selectTests }) => ({ selectTests }))(SetLevel)