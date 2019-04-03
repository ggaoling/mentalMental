import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Tag } from 'antd';

class UserResult extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userResult/fetchList',
    });
  }

  handleTableChange=(pagi)=>{
    const{dispatch,userResult:{pagination}}=this.props;
    dispatch({
        type:'userResult/save',
        payload:{
            pagination:{
                ...pagination,
                pageNo:pagi.current,
                pageSize:pagi.pageSize
            }
        }
    })
    dispatch({
        type:'userResult/fetchList'
    })
}
  render() {
    const { userResult: { data ,pagination} } = this.props;
    const columns = [
      {
        title: '学号',
        dataIndex: 'id',
        width: '20%'

      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '20%'

      },
      {
        title: '联系方式',
        dataIndex: 'tel',
        width: '20%'
      },
      {
        title: '得分',
        dataIndex: 'history',
        width: '20%',
        render: (record, history) =>{history? (<Tag color={Number(history) < 25 ? 'red' : 'green'}>{history}</Tag>):''}
      }
    ]
    return (
      <Card>
        <Table dataSource={data} rowKey='id' columns={columns} pagination={pagination} onChange={this.handleTableChange} onShowSizeChange={this.handleTableChange}/>
      </Card>
    );
  }
}

export default connect(({ userResult, loading }) => ({
  userResult,
  loading
}))(UserResult);
