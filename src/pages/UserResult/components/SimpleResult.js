import React, { Component } from 'react'
import { Bar, Spin } from 'ant-design-pro/lib/Charts'
import { connect } from '../../../../node_modules/dva';

class SimpleResult extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { dispatch, userResult: { uid, sid } } = this.props;
        dispatch({
            type: 'userResult/getResult',
            payload: {
                uid: uid,
                sid: sid
            }
        })

    }
    render() {
        const { data } = this.props;
        if (data) {
            var dataSource = [
                {
                    x: "个人得分",
                    y: data.personal
                }, {
                    x: "平均值",
                    y: data.average
                }
            ]
        }
        return(
            <div>
                {
                    data ? (<Bar height={500}
                        title={data.name}
                        data={dataSource} />
                    ) : <span>无结果</span>
                }
            </div>
        )




    }

}

export default connect(({ userResult }) => ({ userResult }))(SimpleResult)