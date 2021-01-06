import { Form, Input, Button } from 'antd'
import React from "react"
import rules from "~/src/components/WatchCollectionForm/rules"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

function WatchCollectionForm(props: PropsType) {
    const {mode} = props

    function onFinish(values: any) {
        console.log('Success:', values)
    }

    function onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            <Form.Item
                label="Brand"
                name="brand"
                rules={rules.brand}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Model"
                name="model"
                rules={rules.model}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Description"
            name="description"
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )

}


interface PropsType {
    mode: 'add' | 'edit'
}


export default WatchCollectionForm