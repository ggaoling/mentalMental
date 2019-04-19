import React, { Component } from 'react'
import { List, Card, Input, Button } from 'antd'
import { connect } from 'dva';
import router from 'umi/router';
class SeriesTable extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        // dispatch({
        //     type: 'selectTests/save',
        //     payload: {
        //         seriesData: [],
        //         sid: -1,
        //         addNewStatus: false,
        //     }

        // })
        dispatch({
            type: 'takeTests/getSeries'
        })
    }
    handleDetail = (sid) => {
        router.push(`/takeTest/taketest?sid=${sid}`)
    }
    
    render() {
        const { takeTests: { seriesData, } } = this.props;
        return (
            <Card>
                <List
                    header="问卷列表"
                    bordered
                    itemLayout="horizontal"
                    dataSource={seriesData}
                    renderItem={item => (
                        <List.Item actions={[<Button onClick={e => this.handleDetail(item.id.sid)}>开始做题</Button>]}>
                            <List.Item.Meta
                                title={item.name}
                                description={item.description} />
                        </List.Item>
                    )} />
            </Card>
        )
    }
}

export default connect(({ takeTests }) => ({ takeTests }))(SeriesTable)