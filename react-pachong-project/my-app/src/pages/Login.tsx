import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Navigate, useNavigate,} from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import './Login.css';

interface Vlues{
  username:string|undefined,
  password:string|undefined,
  remember:boolean
};
const Login: React.FC = () => {

  const [tourl,setTourl]=useState(false)
  const onFinish = (values: Vlues) => {
    console.log('Success:', values);
    
    axios.post('/api/login',qs.stringify({password:values.password}),
      {headers:{
        "content-Type":'application/x-www-form-urlencoded'
      }}).then((res)=>{
        console.log(res.data.data)
        if(res.data.data){
          setTourl(true)
        }
      })
   
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
 
  return tourl?<Navigate to="/home"/>:(
    <div className="login">
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;