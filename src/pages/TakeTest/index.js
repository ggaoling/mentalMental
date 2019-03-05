import React, { Component } from 'react';
import { connect } from 'dva';

class TakeTest extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'takeTest/fetchList',
    });
  }

  render() {
    return <div>list</div>;
  }
}

export default connect(({ takeTest, loading }) => ({
  takeTest,
  loading: loading.effects['takeTest/fetchList'],
}))(TakeTest);
