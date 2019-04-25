import React, { Component } from 'react'
import { Radar, ChartCard } from 'ant-design-pro/lib/Charts';
import { connect } from 'dva'
import {Card} from 'antd'
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
                        <Card title="外倾性" bordered={false}>
                            指个体对外部世界的积极投入程度。外向者乐于和人相处，充满活力，常常怀有积极的情绪体验。内向者往往安静，抑制，谨慎，对外部世界不太感兴趣。内向者喜欢独处，内向者的独立和谨慎有时会被错认为不友好或傲慢。
                        </Card>
                        <Card title="责任心" bordered={false}>
                             指个体在目标导向行为上的组织、坚持和动机。这个子维度把可靠的、讲究的、有能力的个体和懒散的、行为不规范的个体作比较。同时反映个体自我控制的程度以及延迟需求满足的能力。正面表现为行为规范，可靠，有能力，有责任心，他们似乎总是能把事情做好，处处让人感到满意。负面表现为行为不规范，粗心，做事效率低，不可靠。
                        </Card>
                        <Card title="宜人性" bordered={false}>
                            反应个体在合作与社会和谐性方面的差异。宜人的个体重视和他人的和谐相处，因此他们体贴友好，大方乐于助人，愿意谦让。不宜人的个体更加关注自己的利益，他们一般不关心他人，有时候怀疑他人的动机。不宜人的个体非常理性，很适合科学、工程、军事等此类要求客观决策的情境。
                        </Card>
                        <Card title="开放性" bordered={false}>
                            指个体想像力以及好奇心程度。开放性得分高的人富有想象力和创造力，好奇，欣赏艺术，对美的事物比较敏感。开放性的人偏爱抽象思维，兴趣广泛。封闭性的人讲求实际，偏爱常规，比较传统和保守。开放性的人适合教授等职业，封闭性的人适合警察、销售、服务性职业等。
                        </Card>
                        <Card title="神经质" bordered={false}>
                            指个休体验消极情绪的倾向。神经质维度得分高的人更容易体验到诸如愤怒、焦虑、抑郁等消极的情绪。他们对外界刺激反应比一般人强烈，对情绪的调节能力比较差，经常处于一种不良的情绪状态下。并且这些人思维、决策、以及有效应对外部压力的能力比较差。相反，神经质维度得分低的人较少烦恼，较少情绪化，比较平静，但这并不表明他们经常会有积极的情绪体验，积极情绪体验的频繁程度是外向性的主要内容。
                        </Card>
                    </ChartCard>
                    ) : <span>无结果</span>
                }
            </div>


        )
    }
}

export default connect(({ userResult }) => ({ userResult }))(BFResult)