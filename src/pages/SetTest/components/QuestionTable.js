import React, { Component } from 'react'
import { connect } from 'dva'
import { Input, Button, Table, Modal, } from 'antd'
import styles from '../InputTests/style.less'

const error = Modal.error
class QuestionTable extends Component {
    constructor(props) {
        super(props)

    }

    searchqid = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'questionTable/searchByName'
        })
    }

    handleInput = (value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'questionTable/save',
            payload: { questionName: value }
        })
    }
    handleAdd = (record) => {
        const { dispatch, selectTests: { data } } = this.props;
        let qid = record.qid;
        if (data.findIndex(item => item.qid === qid) > -1) {
            error({ content: '该项已添加过' })
        }
        else {
            dispatch({
                type: 'selectTests/addOne',
                payload: record
            })

        }
    }
    render() {
        const { questionTable, dispatch, canSelect } = this.props
        let { data, questionName } = questionTable
        let index = 1;
        const qidColumns = [
            {
                title: '序号', dataIndex: 'index', render: (record) => { return index++ }
            },
            {
                title: '问题', dataIndex: 'question'
            },
            {
                title: '问题ID', dataIndex: 'qid'
            },
            canSelect ?
                {
                    title: '操作', render: (record) => (
                        <a onClick={e => this.handleAdd(record)}>添加这一项</a>
                    )
                } : {}
        ]

        return (
            <div>
                <div style={{ marginLeft: '30%' }}>
                    <Input style={{ width: '30%', margin: '30px' }} onChange={e => this.handleInput(e.target.value)} />
                    <Button type="primary" onClick={e => this.searchqid()}>查询</Button>
                </div>
                <Table dataSource={data} className={styles.table} columns={qidColumns} />

            </div>
        )
    }
}

export default connect(({ questionTable, selectTests }) => ({ questionTable, selectTests }))(QuestionTable)