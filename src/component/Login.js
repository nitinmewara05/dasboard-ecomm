import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
 

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4500/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.warn(result);
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/home");
      } else {
        setError("Please enter correct details");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/signup">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button onClick={handleLogin} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {error && <p>{error}</p>}
        Or <Link to="/SignUp">register now!</Link>
      </Form.Item>
    </Form>
  );
};
export default Login;

