import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';
import BaseView from './BaseView';
const { Item } = Menu;

@connect(({ user, account,loading }) => ({
  user,
  account,
  loading:loading.effects['user/fetchCurrent']
}))
class Info extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, user } = this.props;
    const {currentUser}=user
    // if (!currentUser.uid) {
    //   return '';
    // }
    return (
      <GridContent>
        <div className={styles.main}>
          <div className={styles.right}>
            <BaseView />
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Info;
