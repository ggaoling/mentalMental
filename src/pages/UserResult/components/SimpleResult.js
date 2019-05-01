import React, { Component } from 'react'
import { Bar, Spin, ChartCard } from 'ant-design-pro/lib/Charts'
import { connect } from '../../../../node_modules/dva';
import { Card } from '../../../../node_modules/antd';

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
                    y: 0
                },
                {
                    x: "个人得分",
                    y: data.personal
                }, {
                    x: "平均值",
                    y: data.average
                }
            ]
        }
        return (
            <div>
                {
                    data ? (<ChartCard><Bar height={500}
                        title={data.name}
                        data={dataSource} />
                        <Card title="结果解读">
                            {data.explain}
                        </Card>
                    </ChartCard>
                    ) : <span>无结果</span>
                }
            </div>
        )




    }

}

export default connect(({ userResult }) => ({ userResult }))(SimpleResult)