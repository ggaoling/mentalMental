import React, { Component } from 'react'
import { Steps ,Card} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less'

const {Step}=Steps;
class InputTests extends Component {
    constructor(props) {
        super(props)
    }

    

    getCurrentStep=()=> {
        const { location: { pathname } } = this.props
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
            case 'step1':
                return 0;
            case 'step2':
                return 1;
            case 'step3':
                return 2;
            default:
                return 0;
        }
    }
    render() {
        const { location, children } = this.props;

        return (
            <PageHeaderWrapper
                title="录入题目"
                tabActiveKey={location.pathname}
                content="按照引导录入题目"
            >
                <Card bordered={false}>
                    <Steps current={this.getCurrentStep()} className={styles.steps}>
                        <Step title="新增题目" />
                        <Step title="设置关联问题" />
                        <Step title="完成" />
                    </Steps>
                    {children}
                </Card>

            </PageHeaderWrapper>
        )
    }
}

export default InputTests