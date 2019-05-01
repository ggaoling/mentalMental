import React, { Component } from 'react'
import { connect } from '../../../../node_modules/dva';
import { Card, Button, List, Input } from 'antd'

class SetLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editStatus: false,
            level: [],
            description: [],
            sid: -1
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectTests/getSeries'
        })


    }
    changeEditStatus = (sid) => {
        const { editStatus } = this.state
        const { dispatch } = this.props
        this.setState({
            editStatus: !editStatus,
            sid: sid
        })
        dispatch({
            type: 'selectTests/getLevel',
            payload: { sid: sid }
        })
    }
    submit = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectTests/submitLevel',
            payload: {
                num: this.state.level,
                description: this.state.description,
                sid: this.state.sid
            }
        })
        this.setState({
            editStatus: false
        })
    }
    render() {
        const { selectTests: { seriesData, levelData } } = this.props;
        const { editStatus, level, description } = this.state
        return (
            <Card>
                {
                    editStatus ? (
                        <div>
                            {
                                Array.isArray(levelData) && levelData.length > 0 ? (
                                    <div>
                                        {
                                            levelData.map((elem, index) =>{
                                                return index == 0 ? (
                                                    <div key={elem.lid} style={{margin:'20px 20px'}}>0-{elem.num}:{elem.description}</div>
                                                ) : (<div key={elem.lid} style={{margin:'20px 20px'}}>{levelData[index - 1].num}-{elem.num}:{elem.description}</div>)
                                            })
                                        }
                                    </div>

                                ) : (
                                        <div>
                                            <div style={{ paddingBottom: '20px' }}>
                                                第一级别：0~<Input style={{ width: '5%' }} onChange={e => {
                                                    level[0] = e.target.value
                                                    this.setState({
                                                        level: level
                                                    })
                                                }} />
                                                <div style={{ padding: '20 5' }}>
                                                    描述：<Input.TextArea rows={4} onChange={e => {
                                                        description[0] = e.target.value
                                                        this.setState({
                                                            description: description
                                                        })
                                                    }} />
                                                </div>

                                            </div>
                                            <div style={{ paddingBottom: '20px' }}>
                                                第二级别：<Input style={{ width: '5%' }} onChange={e => {
                                                    level[1] = e.target.value
                                                    this.setState({
                                                        level: level
                                                    })
                                                }} />
                                                <div style={{ padding: '20 5' }}>
                                                    描述：<Input.TextArea rows={4} onChange={e => {
                                                        description[1] = e.target.value
                                                        this.setState({
                                                            description: description
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div style={{ paddingBottom: '20px' }}>
                                                第三级别：<Input style={{ width: '5%' }} onChange={e => {
                                                    level[2] = e.target.value
                                                    this.setState({
                                                        level: level
                                                    })
                                                }} />
                                                <div style={{ padding: '20 5' }}>
                                                    描述：<Input.TextArea rows={4} onChange={e => {
                                                        description[2] = e.target.value
                                                        this.setState({
                                                            description: description
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div style={{ paddingBottom: '20px' }}>
                                                第四级别：<Input style={{ width: '5%' }} onChange={e => {
                                                    level[3] = e.target.value
                                                    this.setState({
                                                        level: level
                                                    })
                                                }} />
                                                <div style={{ padding: '20 5' }}>
                                                    描述：<Input.TextArea rows={4} onChange={e => {
                                                        description[3] = e.target.value
                                                        this.setState({
                                                            description: description
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <Button type="primary" onClick={e => this.submit()}>提交</Button>
                                        </div>
                                    )
                            }
                        </div>) :
                        (<div>

                            <List
                                header="问卷列表"
                                bordered
                                itemLayout="horizontal"
                                dataSource={seriesData}
                                renderItem={item => (
                                    <List.Item actions={[<Button onClick={e => this.changeEditStatus(item.id.sid)}>设置规则</Button>]}>
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.description} />
                                    </List.Item>
                                )} />
                        </div>)
                }
            </Card>
        )
    }
}



export default connect(({ selectTests }) => ({ selectTests }))(SetLevel)