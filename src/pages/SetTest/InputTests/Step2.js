import React, { Fragment } from 'react'
import { connect } from 'dva'
import { Form, Table, Button, Input, Modal, Card, Row, Divider } from 'antd';
import styles from './style.less'
import QuestionTable from '../components/QuestionTable'


@connect(({ inputTests, questionTable }) => ({ inputTests, questionTable }))
class Step2 extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    handleBind = (type, key) => {
        const { dispatch } = this.props
        if (type == 1) {
            dispatch({
                type: 'inputTests/bindNext',
                payload: key
            })
        }
        else {

            dispatch({
                type: 'inputTests/cancelBind',
                payload: key
            })
        }

    }
    handleBindingInput = (key, value) => {
        const { dispatch } = this.props;
        let obj = { key: key, value: value }
        dispatch({
            type: 'inputTests/saveBindingInput',
            payload: obj
        })
    }

    handleNext = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'inputTests/postData'
        })

    }




    handleScoreInput = (value, key) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'inputTests/saveScoreInput',
            payload: {
                value: value,
                index: key
            }
        })

    }

    handleSaveScore = (key) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'inputTests/saveScore',
            payload: key
        })
        this.handleUpdateScoreChange(key)
    }

    handleUpdateScoreChange = (index) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'inputTests/updateScoreChange',
            payload: index
        });
    }

    render() {
        const { inputTests, dispatch, } = this.props;
        let { data, changeScore, qratio } = inputTests
        let { answers } = data
        const columns = [
            { title: '序号', dataIndex: 'key', key: 'key', width: '10%', render: (text, record) => (`${record.key + 1}`) },
            { title: '选项', dataIndex: 'answer', key: 'answer', width: '30%', },
            {
                title: '分数', dataIndex: 'qratio', key: 'qratio', width: '26%',
                render: (qratio, record) => (
                    <div>
                        {
                            changeScore[record.key] ?
                                (<div> <Input style={{ width: "18%" }} defaultValue={answers[record.key].qratio} onChange={e => this.handleScoreInput(e.target.value, record.key)} /> <Button type="primary" onClick={e => this.handleSaveScore(record.key)}>确定</Button></div>)
                                : (<div>{qratio}<Button type="primary" style={{ marginLeft: '5px' }} onClick={e => this.handleUpdateScoreChange(record.key)}>修改</Button></div>)
                        }
                    </div>
                )
            },
            { title: '关联问题', dataIndex: 'binding', key: 'binding', width: '30%', render: (binding, record) => (binding ? binding : <Input style={{ width: '20%' }} onChange={e => this.handleBindingInput(record.key, e.target.value)} />) },
            { title: '操作', key: 'action', width: '10%', render: (text, record) => (<span>{record.binding ? <a onClick={e => this.handleBind(-1, record.key)}>解绑</a> : <a onClick={e => this.handleBind(1, record.key)}>绑定</a>}</span>) }
        ]
        let index = 1;

        return (
            <div>

                <div className={styles.title}>问题：{data.question}</div>
                <Table className={styles.table} dataSource={answers} rowKey='key' columns={columns} />
                <Button type="primary" style={{ marginLeft: '40%' }} onClick={this.handleNext}>下一步</Button>
                <Card style={{ padding: '5px', margin: '40px 15px' }}>
                    <QuestionTable />
                </Card>
            </div>

        )
    }
}

export default Step2;
