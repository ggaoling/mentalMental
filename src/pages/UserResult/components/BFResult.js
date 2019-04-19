import React, { Component } from 'react'
import { Radar, ChartCard } from 'ant-design-pro/lib/Charts';
import { connect } from 'dva'
class BFResult extends Component {

    constructor(props) {
        super(props);
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
            var dataSource = data.dataList;
            const radarTitleMap = {
                o: '开放性',
                c: '严谨性',
                e: '外向性',
                a: '顺同性',
                n: '神经质',
            };
            var radarData = [];
            dataSource.forEach((item) => {
                Object.keys(item).forEach((key) => {
                    if (key !== "name") {
                        radarData.push({
                            name: item.name,
                            label: radarTitleMap[key],
                            value: item[key]
                        })
                    }
                })
            })
        }

        return (
            <div>
                {
                    data ? (<ChartCard title={data.name}>
                            <Radar hasLegend height={400} data={radarData} />
                        </ChartCard>
                    ) : <span>无结果</span>
                }
            </div>


        )
    }
}

export default connect(({ userResult }) => ({ userResult }))(BFResult)