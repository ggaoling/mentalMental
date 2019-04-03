import React, { Component,Fragment  } from 'react'
import { Button, Card } from 'antd'
import router from 'umi/router';
import Result from '@/components/Result'

class SelectSuccess extends Component {

    constructor(props) {
        super(props)
    }

    handleToHome=()=>{
        router.push("/account")
    }
    render() {
        const actions=(
            <Fragment>
                <Button type="primary" onClick={e=>this.handleToHome()}>返回首页</Button>
            </Fragment>
            )
        return (
            <Card bordered={false}>
                <Result
                    type="success"
                    title={'操作成功'}
                    description={'已成功设定一套题目'}
                    actions={actions}
                    style={{ marginTop: 48, marginBottom: 16 }}
                />
            </Card>
        )
    }
}
export default SelectSuccess;