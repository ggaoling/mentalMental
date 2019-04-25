import React, { Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Icon, Radio, Col, Modal, InputNumber } from 'antd';
import router from 'umi/router';
import styles from './style.less'


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
        span: 19, offset: 5
    },
}



@Form.create()
class Step1 extends React.Component {

    constructor(props) {
        super(props)
    }

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
        const { form, inputTests, dispatch } = this.props;
        let { id } = inputTests
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        dispatch({
            type: 'inputTests/save',
            payload: {
                id: id
            }
        })
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    onValiedateForm = () => {
        const { form, dispatch, inputTests } = this.props;
        let { validateFields } = form
        let { data, qid } = inputTests
        let { answers } = data
        validateFields((err, values) => {
            if (!err) {
                let changeScore = new Array(values.answers.length)
                values.answers = values.answers.map((ele, index) => {
                    let obj = {};
                    obj.answer = ele;
                    obj.binding = 0;
                    obj.qratio = 0;
                    obj.key = index;
                    if (answers.length > 0) {
                        obj.qid = qid
                    }
                    if (answers.length > 0 && index < answers.length) {
                        obj.aid = answers[index].aid
                        obj.binding = answers[index].binding;
                        obj.qratio = answers[index].qratio;
                    }
                    return obj
                })
                changeScore.fill(true)
                dispatch({
                    type: 'inputTests/save',
                    payload: { data: { ...values }, changeScore: changeScore },
                })
                let url = '/setTest/inputTests/step2'
                if (qid) {
                    url += `?qid=${qid}`
                }
                router.push(url)
            }

        })
    }
    render() {
        const { inputTests: { data, fixId }, dispatch, form } = this.props;
        const { getFieldDecorator, validateFields, getFieldValue } = form;
        let {
            question = '',
            type = 1,
            importance = 0,
            answers = []
        } = data;
        let keysArray = []
        if (answers.length > 0) {
            for (let i = 0; i < answers.length; i++) {
                keysArray[i] = i;
            }
        }
        else {
            keysArray = [0, 1]
        }
        getFieldDecorator('keys', { initialValue: keysArray });
        const keys = getFieldValue('keys');

        const answerItems = keys.map((k, index) => (
            <Form.Item {...index == 0 ? formItemLayout : formItemLayoutWithoutLabel}
                label={index === 0 ? '答案选项' : ''}
                required={index < 2 ? true : false}
                key={k}
            >
                {getFieldDecorator(`answers[${k}]`, {
                    validateTriger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        message: '请输入答案选项或者移除该项'
                    }, {
                        max: 40, message: '最多输入40个字符'
                    }],
                    onValidateTrigger: ['onChange', 'onBlur'],
                    initialValue: answers.length > 0 && index < fixId ? answers[index].answer : null
                })(
                    <Input placeholder="option" style={{ width: '80%', marginRight: 8 }} />
                )}
                {keys.length > 2 ? (
                    <Icon className="dynamic-delete-button" type="minus-circle-o" disabled={keys.length === 1} onClick={e => this.remove(k)} />
                ) : null}
            </Form.Item>

        ))
        return (
            <Form layout="horizontal" className={styles.stepForm} onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayout} label="问题">
                    {getFieldDecorator('question', {
                        rules: [
                            { required: true, message: '请输入问题' },
                            { max: 60, message: '最多输入60个字符' }],
                        initialValue: question
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="重要性">
                    {
                        getFieldDecorator('importance', {
                            rules: [
                                { required: true, message: '请输入该问题重要性' }
                            ],
                            initialValue: importance
                        })(<InputNumber />)
                    }
                </Form.Item>
                <Form.Item {...formItemLayout} label='类型'>
                    {getFieldDecorator('type', {
                        initialValue: type,
                        rules: [{
                            required: true, message: '若不选择则默认单选'
                        }]
                    })(
                        <Radio.Group >
                            <Radio value={1}>单选</Radio>
                            <Radio value={2}>多选</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="大五人格类型">
                    {getFieldDecorator('dwtype', {
                        required: false
                    })(
                        <Radio.Group>
                            <Radio value={null}>无</Radio>
                            <Radio value="o">开放性</Radio>
                            <Radio value="c">责任性</Radio>
                            <Radio value="e">外向性</Radio>
                            <Radio value="a">宜人性</Radio>
                            <Radio value="n">神经质</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                {answerItems}
                <Button type="dashed" onClick={this.add} style={{ width: '60%', marginLeft: '22%' }}><Icon type="plus">增加一项</Icon></Button>
                <Form.Item {...formItemLayout}>
                    <Button type="primary" onClick={e => this.onValiedateForm()} style={{ marginLeft: '60%', marginTop: '15px' }}>下一步</Button>
                </Form.Item>
            </Form>

        )
    }
}

export default connect(({ inputTests }) => ({ inputTests }))(Step1);