import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Tag, Radio, message } from 'antd';
import router from 'umi/router'
class UserResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userResult/fetchList',
    });
    dispatch({
      type: 'userResult/getRadioData',
    });
  }

  handleTableChange = (pagi) => {
    const { dispatch, userResult: { pagination } } = this.props;
    dispatch({
      type: 'userResult/save',
      payload: {
        pagination: {
          ...pagination,
          pageNo: pagi.current,
          pageSize: pagi.pageSize
        }
      }
    })
    dispatch({
      type: 'userResult/fetchList'
    })
  }
  handleResult = (id) => {
    if (this.state.value == 0) {
      message.error("请选择一个问卷进行查看")
    }
    else {
      let sid = Number(this.state.value);
      console.log(this.state.value)
      router.push(`/userResult/result?uid=${id}&sid=${sid}`)
    }

  }
  onChange = (value) => {
    // let value = e.target.value;
    this.setState({
      value: value
    })
    console.log(this.state.value)
  }
  render() {
    const { userResult: { data, pagination, radioData } } = this.props;
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
        title: '操作',
        width: '20%',
        render: record => { return (<a onClick={e => this.handleResult(record.id)}>查看详情</a>) }
      }
    ]
    return (
      <Card>
        <Card style={{
            left: '255px',
            position: 'fixed',
            bottom: 0,//这里换成top:0;就悬浮在头部
            width: '100%',
            zIndex: 100,
          }}>
          <Radio.Group onChange={e=>this.onChange(e.target.value)} value={this.state.value} >
            {
              radioData.map(elem => <Radio key={elem.id.sid} value={elem.id.sid}>{elem.name}</Radio>)
            }
          </Radio.Group>
          </Card>
            <Table dataSource={data} rowKey='id' columns={columns} pagination={pagination} onChange={this.handleTableChange} onShowSizeChange={this.handleTableChange} />
          </Card >
          );
        }
      }
      
export default connect(({userResult, loading }) => ({
            userResult,
          loading
        }))(UserResult);
