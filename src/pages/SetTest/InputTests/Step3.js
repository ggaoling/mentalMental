import React, { Fragment } from 'react'
import Result from '@/components/Result'
import {Button,Card} from 'antd'
import router from 'umi/router';

export default class Step3 extends React.Component {
    constructor(props) {
        super(props)
    }

    handleToStep1=()=>{
        router.push('/setTest/inputTests/step1')
    }
    render() {
        const actions=(
            <Fragment>
                <Button type="primary" onClick={e=>this.handleToStep1()}>继续添加</Button>
            </Fragment>
            )
        return (
                <Card bordered={false}>
                    <Result
                        type="success"
                        title={'添加成功'}
                        description={'已成功添加题目'}
                        actions={actions}
                        style={{ marginTop: 48, marginBottom: 16 }}
                    />
                </Card>
        )
    }
}