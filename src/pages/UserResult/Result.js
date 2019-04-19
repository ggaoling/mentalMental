import React, { Component } from 'react'
import BFResult from './components/BFResult'
import SimpleResult from './components/SimpleResult'
import { connect } from 'dva';
import { Card } from 'antd';
class Result extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch, userResult: { uid, sid } } = this.props;
        dispatch({
            type:'userResult/save',
            payload:{
                resultData: null,
                radioData: []
            }
        })
        dispatch({
            type: 'userResult/getResult',
            payload: {
                uid: uid,
                sid: sid
            }
        })

    }
    render() {
        const { userResult: { uid, sid, resultData } } = this.props;
        console.log('pre',resultData)
        return (
            <Card bordered>
                {
                    sid == 12 ? (
                        <BFResult data={resultData} />
                    ) : (
                            <SimpleResult data={resultData} />
                        )
                }
            </Card>
        )
    }
}
export default connect(({ userResult }) => ({ userResult }))(Result)