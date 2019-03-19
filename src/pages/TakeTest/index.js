import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Radio, Checkbox, Button, Card } from 'antd';
import Result from '@/components/Result'

@Form.create()
class TakeTest extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'takeTests/fetchList',
    });
    dispatch({
      type: 'takeTests/initialRenderList'
    })
  }
  handleNext = () => {
    const { dispatch, form, takeTests: { renderList } } = this.props
    let { validateFields, resetFields } = form
    validateFields((err, values) => {
      if (!err) {
        let results = values.values;
        for (let i = 0; i < 5; i++) {
          results[i] = { aid: results[i], qid: renderList[i].qid }
        }
        dispatch({
          type: 'takeTests/saveResult',
          payload: results
        })
        dispatch({
          type: 'takeTests/stepNext',
          payload: results
        })
        resetFields()
      }
    })
  }

  handleSubmit = () => {
    const { dispatch, form } = this.props
    dispatch({
      type: 'takeTests/postResults',
    })
  }


  render() {
    const { takeTests: { renderList, step, finished, totalStep, openTest }, form } = this.props
    const { getFieldDecorator } = form
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const checkboxStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    if (openTest) {
      return (<Card>
        {
          finished ? (
            <Result
              type="success"
              title={'提交成功'}
              style={{ marginTop: 48, marginBottom: 16 }}
            />
          ) : (
              <Form>
                {renderList.map((item, index) => {
                  const defaultValue = item.type == 1 ? '' : [''];
                  return (
                    <Form.Item key={item.qid}>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>{(step - 1) * 5 + index + 1}. {item.question} {item.type == 1 ? '(单选)' : '(多选)'}</span>
                      <br />
                      {getFieldDecorator(`values[${index}]`,
                        {
                          rules: [{ required: true, message: '请作出选择' }],
                          initialValue: defaultValue
                        })
                        (
                          item.type === 1 ? <Radio.Group >
                            {item.answers.map(answer => (<Radio key={answer.aid} value={answer.aid} style={radioStyle}>{answer.qoption}</Radio>))}
                          </Radio.Group> : <Checkbox.Group >
                              {item.answers.map(answer => (<Checkbox key={answer.aid} value={answer.aid} style={checkboxStyle}>{answer.qoption}</Checkbox>))}
                            </Checkbox.Group>
                        )
                      }

                    </Form.Item>
                  )
                })
                }
                <Form.Item style={{ float: "right" }}>
                  <Button type="primary" onClick={step < totalStep ? this.handleNext : this.handleSubmit}>{step < totalStep ? '下一页' : '提交'}</Button>
                </Form.Item>
              </Form>
            )
        }

      </Card>);
    }
    else{
      return (
        <Card>当前没有可做的问卷</Card>
      )
    }

  }
}

export default connect(({ takeTests, loading }) => ({
  takeTests,
  loading,
}))(TakeTest);
