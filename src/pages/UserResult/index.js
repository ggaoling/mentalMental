import React, { Component } from 'react';
import { connect } from 'dva';

class UserResult extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userResult/fetchList',
    });
  }

  render() {
    return <div>list</div>;
  }
}

export default connect(({ userResult, loading }) => ({
  userResult,
  loading: loading.effects['userResult/fetchList'],
}))(UserResult);
