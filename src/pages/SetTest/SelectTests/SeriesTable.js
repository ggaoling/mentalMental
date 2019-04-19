import React, { Component } from 'react'
import { List, Card, Input, Button } from 'antd'
import { connect } from 'dva';
import router from 'umi/router';
class SeriesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectTests/save',
            payload: {
                seriesData: [],
                sid: -1,
                addNewStatus: false,
            }

        })
        dispatch({
            type: 'selectTests/getSeries'
        })
    }
    handleDetail = (sid) => {
        router.push(`/setTest/selectTests/select?sid=${sid}`)
    }
    changeAddNewStatus = () => {
        const { dispatch, selectTests: { addNewStatus } } = this.props;
        dispatch({
            type: 'selectTests/save',
            payload: {
                addNewStatus: !addNewStatus
            }
        })
    }
    postSeries = () => {
        const { name, description } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: 'selectTests/addSeries',
            payload: {
                name: name,
                description: description
            }
        })

    }
    render() {
        const { selectTests: { seriesData, addNewStatus } } = this.props;
        return (
            <Card>
                {
                    addNewStatus ? (
                        <div>
                            <span>
                                系列名称：<Input onChange={e => this.setState({ name: e.target.value })} />
                            </span>
                            <span>
                                描述：<Input.TextArea rows={3} onChange={e => this.setState({ description: e.target.value })} />
                            </span>
                            <Button type="primary" onClick={this.postSeries}>提交</Button>
                        </div>) :
                        (
                            <div>

                                <List
                                    header="问卷列表"
                                    bordered
                                    itemLayout="horizontal"
                                    dataSource={seriesData}
                                    renderItem={item => (
                                        <List.Item actions={[<Button onClick={e => this.handleDetail(item.id.sid)}>查看</Button>]}>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={item.description} />
                                        </List.Item>
                                    )} />
                                <Button type="primary" onClick={e => this.changeAddNewStatus()}>新增一套问卷</Button>
                            </div>

                        )
                }



            </Card>
        )
    }
}

export default connect(({ selectTests }) => ({ selectTests }))(SeriesTable)