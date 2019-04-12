import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form, List, Divider, Button, Table } from 'antd';
import QuestionTable from '../components/QuestionTable'
import styles from '../InputTests/style.less'
class SelectTests extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'selectTests/getSelected'
        })
    }

    handleRemoveOne = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'selectTests/removeOne',
            payload: record
        })
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'selectTests/postData'
        })
    }
    handleChangeSelectStatus = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectTests/changeSelectStatus'
        })
    }
    handleTableChange = (pagi) => {
        const { dispatch, selectTests: { pagination } } = this.props;
        dispatch({
            type: 'selectTests/save',
            payload: {
                pagination: {
                    ...pagination,
                    pageNo: pagi.current,
                    pageSize: pagi.pageSize
                }
            }
        })
        dispatch({
            type: 'selectTests/getSelected'
        })
    }
    render() {
        const { selectTests } = this.props
        const { data, selectStatus, selectedData, pagination } = selectTests
        let index = 1;
        const columns = [
            {
                title: '序号', dataIndex: 'index', width: '10%', render: (record) => { return index++ }
            },
            {
                title: '问题ID', dataIndex: 'qid', width: '15%',
            },
            {
                title: '问题', dataIndex: 'question', width: '60%',
            },
        ]
        return (
            <Card bordered={false}>
                {
                    selectStatus ? <div>
                        <Card style={{ marginBottom: '30px' }}>
                            <List
                                size="default"
                                itemLayout="horizontal"
                                header='已选择的题目'
                                bordered dataSource={data}
                                renderItem={item => (<List.Item key={item.qid} extra={<a style={{ float: 'right' }} onClick={e => this.handleRemoveOne(item)}>移除这一项</a>}>{item.qid}<Divider type='vertical'></Divider>{item.question}</List.Item>)}>
                            </List>
                            <Button type="primary" style={{ margin: '10px 45%' }} onClick={e => this.handleSubmit()}>提交</Button>
                        </Card>
                        <Card>
                            <QuestionTable canSelect={true} />
                        </Card>
                    </div>
                        :
                        <div>
                            <Button type="primary" style={{ marginLeft: '20px' }} onClick={e => this.handleChangeSelectStatus()}>重新选择</Button>
                            <Table
                                dataSource={selectedData}
                                rowKey='qid'
                                className={styles.table}
                                columns={columns}
                                pagination={pagination}
                                onChange={this.handleTableChange}
                                />
                        </div>


                }
            </Card>
        )

    }
}

export default connect(({ selectTests }) => ({
    selectTests
}))(SelectTests)