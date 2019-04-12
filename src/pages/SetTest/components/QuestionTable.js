import React, { Component } from 'react'
import { connect } from 'dva'
import { Input, Button, Table, Modal, } from 'antd'
import styles from '../InputTests/style.less'

const error = Modal.error
class QuestionTable extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        const {dispatch}=this.props;
        dispatch({
            type:'questionTable/save',
            payload:{
                questionName:'',
                pagination:{
                    pageNo:1,
                    pageSize:10,
                    total:0
                },
            }
        })
        dispatch({
            type:'questionTable/searchByName',
        })
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
    handleTableChange=(pagi)=>{
        const{dispatch,questionTable:{pagination}}=this.props;
        dispatch({
            type:'questionTable/save',
            payload:{
                pagination:{
                    ...pagination,
                    pageNo:pagi.current,
                    pageSize:pagi.pageSize
                }
            }
        })
        dispatch({
            type:'questionTable/searchByName'
        })
    }
    render() {
        const { questionTable, dispatch, canSelect,action} = this.props
        let { data, questionName,pagination,total } = questionTable
        let index = 1;
        const qidColumns = [
            {
                title: '序号', dataIndex: 'index', width:'10%', render: (record) => { return index++ }
            },
            {
                title: '问题ID', dataIndex: 'qid', width:'15%',
            },
            {
                title: '问题', dataIndex: 'question', width:'60%',
            },
            canSelect ?
                {
                    title: '操作', width:'30%',render: (record) => (
                        <a onClick={e => this.handleAdd(record)}>添加这一项</a>
                    )
                } : {},
            action?
            {
                title:'操作',width:'15%',render:(record)=>(
                    <a onClick={e=>action.func(record)}>{action.name}</a>
                )
            }:{}
        ]

        return (
            <div>
                <div style={{ marginLeft: '10%' }}>
                    <Input style={{ width: '30%', margin: '30px 10px 30px 30%' }} onChange={e => this.handleInput(e.target.value)} />
                    <Button type="primary" onClick={this.searchqid}>查询</Button>
                </div>
                <Table dataSource={data} rowKey='qid' className={styles.table} columns={qidColumns} pagination={pagination} onChange={this.handleTableChange}/>

            </div>
        )
    }
}

export default connect(({ questionTable, selectTests }) => ({ questionTable, selectTests }))(QuestionTable)