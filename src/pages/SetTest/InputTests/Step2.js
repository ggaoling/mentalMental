import React, { Fragment } from 'react'
import { connect } from 'dva'
import { Form, Table, Button, Input,Modal } from 'antd';
import styles from './style.less'
import router from 'umi/router';

@connect(({ inputTests }) => ({ inputTests }))
class Step2 extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    handleBind = (type, key) => {
        console.log(type,key)
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

    handleInputChange = (key, value) => {
        const { dispatch } = this.props;
        console.log('key', key, value)
        let obj = { key: key, value: value }
        dispatch({
            type: 'inputTests/saveInput',
            payload: obj
        })
        console.log(this.props.inputTests)
    }
    handleNext = () => {
        const{dispatch}=this.props;
        dispatch({
            type:'inputTests/postData'
        })
        router.push('/setTest/inputTests/step3')
    }

    render() {
        const { inputTests, dispatch, } = this.props;
        let { data } = inputTests
        let { answers } = data
        const columns = [
            { title: '序号', dataIndex: 'key', key: 'key',width:'5%', render: (text, record) => (`${record.key + 1}`) },
            { title: '选项', dataIndex: 'answer', key: 'answer',width:'30%', },
            { title: '关联问题', dataIndex: 'binding', key: 'binding', width:'30%',render: (binding, record) => (binding ? binding : <Input style={{width:'30%'}}onChange={e => this.handleInputChange(record.key, e.target.value)} />) },
            { title: '操作', key: 'action',width:'5%', render: (text, record) => (<span>{record.binding ? <a onClick={e => this.handleBind(-1, record.key)}>解绑</a> : <a onClick={e => this.handleBind(1, record.key)}>绑定</a>}</span>) }
        ]
        return (
            <div>
                <div className={styles.title}>问题：{data.question}</div>
                <Table className={styles.table} dataSource={answers} rowKey='key' columns={columns} />
                <Button type="primary" style={{ marginLeft: '40%' }} onClick={this.handleNext}>下一步</Button>
            </div>

        )
    }
}

export default Step2;
