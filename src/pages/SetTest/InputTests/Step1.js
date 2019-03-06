import React, { Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Icon } from 'antd';
import router from 'umi/router';
import styles from './style.less'

let id = 0;
const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

const formItemLayoutWithoutLabel = {
    wrapperCol: {

        sm: { span: 19, offset: 5 },
    }
}

@connect(({ inputTests }) => ({ inputTests }))
@Form.create()
class Step1 extends React.PureComponent {

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 2) {
            return;
        }
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    render() {
        const { inputTests: { data }, dispatch, form } = this.props;
        const { getFieldDecorator, validateFields, getFieldValue } = form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const onValiedateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'inputTests/save',
                        payload: values,
                    })
                    router.push('/setTest/inputTests/step2')
                }
            })
        }
        const answerItems = keys.map((k, index) => (
            <Form.Item {...index == 0 ? formItemLayout : formItemLayoutWithoutLabel}
                label={index === 0 ? '答案选项' : ''}
                required={index < 2 ? true : false}
                key={k}>
                {getFieldDecorator(`answers[${k}]`, {
                    validateTriger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        message: '请输入答案选项或者移除该项'
                    }]
                })(
                    <Input placeholder="option" />
                )}
                {keys.length > 2 ? (
                    <Icon className="dynamic-delete-button" type="minus-circle-o" disabled={keys.length === 1} onClick={e => this.remove(k)} />
                ) : null}
            </Form.Item>
        ))
        return (
            <Fragment>
                <Form layout="horizontal" className={styles.stepForm}>
                    <Form.Item {...formItemLayout} label="问题">
                        {getFieldDecorator('question', {
                            initialValue: data.question,
                            rules: [{ required: true, message: '请输入问题' }],
                        })(<Input />)}
                    </Form.Item>
                    {answerItems}
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}><Icon type="plus">增加一项</Icon></Button>
                    <Form.Item {...formItemLayout}>
                        <Button type="primary" onClick={onValiedateForm}>下一步</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

export default Step1;