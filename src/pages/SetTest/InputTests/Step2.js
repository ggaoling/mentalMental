import React, { Fragment } from 'react'
import { connect } from 'dva'
import { Form, Table } from 'antd';

@connect(({ inputTests }) => ({ inputTests }))
class Step2 extends React.PureComponent {

    render() {
        const { inputTests: { data }, dispatch, } = this.props;
        const columns = [
            { title: '问题', dataIndex: 'answer', key: 'answer' },
            { title: '关联问题', dataIndex: 'binding', key: 'binding' },
            { title: '操作', key: 'action', render: (text, record) => (<span>{record.bind ? <span onClick={e => this.handleBind(1)}>解绑</span> : <span onClick={this.handleBind(-1)}>绑定</span>}</span>) }
        ]
        return (
            <Table dataSource={data.answers} rowKey={key} columns={columns} />
        )
    }
}

export default Step2;
