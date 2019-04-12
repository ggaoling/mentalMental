import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Radio, Checkbox, Button, Card } from 'antd';
import Result from '@/components/Result'

@Form.create()
class TakeTest extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:'takeTests/save',
      payload:{
        questionList: [],
        step: 1,
        renderList: [],
        result: [],
        finished: false,
        openTest: false
      }
    })
    dispatch({
      type: 'takeTests/fetchList',
    });
  }
  handleNext = () => {
    const { dispatch, form, takeTests: { renderList ,step,questionList} } = this.props
    let { validateFields, resetFields } = form
    validateFields((err, values) => {
      if (!err) {
        let results = values.values;
        for (let i = 0; i < 5; i++) {
          if(results[i]){
            results[i] = { aid: results[i], qid: renderList[i].qid }
          }
        }
        dispatch({
          type: 'takeTests/saveResult',
          payload: results
        })
        //提交
        if(questionList.length==0){
          dispatch({
            type: 'takeTests/postResults',
          })
        }
        else{
          dispatch({
            type: 'takeTests/stepNext',
            payload: results
          })
        }
        resetFields()
      }
    })
  }


  render() {
    const { takeTests: { renderList, step, finished, openTest ,questionList}, form } = this.props
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
                  const defaultValue = item.type == 1 ? '' : [];
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
                            {item.answers.map(ele => (<Radio key={ele.aid} value={ele.aid} style={radioStyle}>{ele.answer}</Radio>))}
                          </Radio.Group> : <Checkbox.Group >
                              {item.answers.map(ele => (<Checkbox key={ele.aid} value={ele.aid} style={checkboxStyle}>{ele.answer}</Checkbox>))}
                            </Checkbox.Group>
                        )
                      }

                    </Form.Item>
                  )
                })
                }
                <Form.Item style={{ float: "right" }}>
                  <Button type="primary" onClick={this.handleNext}>{questionList.length>0 ? '下一页' : '提交'}</Button>
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

export default connect(({ takeTests,loading }) => ({
  takeTests,
  isLoading:loading.effects['/takeTests/fetchList']
}))(TakeTest);
