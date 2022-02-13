import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'
import {Form,Input,Button} from 'antd'
import { LongButton } from '.'
export const RegisterScreen = () => {
    const {register, user} = useAuth()

    const handleSubmit = (values:{username:string,password:string})=> {
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        register(values)
    }
    return  <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
        {/* <label htmlFor='username'>用户名</label> */}
        <Input placeholder='用户名' type="text" id='username' />
    </Form.Item>
    <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
        {/* <label htmlFor='password'>密码</label> */}
        <Input placeholder='密码' type="password" id='password' />
    </Form.Item>
    <Form.Item>
         <LongButton htmlType='submit' type='primary'>注册</LongButton>
    </Form.Item>
</Form>
}