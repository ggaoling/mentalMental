import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button, List } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@connect(({ user, account }) => ({
  currentUser: user.currentUser,
  account,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {}

  handleEdit = () => {
    const {
      dispatch,
      account: { isEdit },
    } = this.props;
    dispatch({
      type: 'account/save',
      payload: {
        isEdit: !isEdit,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, currentUser, dispatch } = this.props;
    this.handleEdit();
    form.getFieldsValue(['phone', 'email']);
    dispatch({
      type: 'user/updateUserInfo',
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      account,
      currentUser,
    } = this.props;
    const { isEdit } = account;
    const { email, name, phone, id } = currentUser;
    return (
      <div className={styles.baseView}>
        <div className={styles.left}>
          {isEdit ? (
            <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
              <FormItem label="学号">
                {getFieldDecorator('id', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                    },
                  ],
                  initialValue: id,
                })(<Input disabled={true} />)}
              </FormItem>
              <FormItem label="名字">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                    },
                  ],
                  initialValue: name,
                })(<Input disabled={true} />)}
              </FormItem>
              <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                    },
                  ],
                  initialValue: email,
                })(<Input />)}
              </FormItem>

              <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                    },
                    { validator: validatorPhone },
                  ],
                  initialValue: phone,
                })(<Input />)}
              </FormItem>
              <Button type="primary" htmlType="submit">
                <FormattedMessage
                  id="app.settings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form>
          ) : (
            <div>
              <List itemLayout="horizontal" split={false}>
                <List.Item>名字：{name}</List.Item>
                <List.Item>学号：{id}</List.Item>
                <List.Item>邮箱：{email}</List.Item>
                <List.Item>联系方式：{phone}</List.Item>
                <List.Item>
                  <Button onClick={this.handleEdit}>更改资料</Button>
                </List.Item>
              </List>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BaseView;
