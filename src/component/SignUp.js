import {
  Button,
  Checkbox,
  Form,
  Input,
  Slider,
  Space,
  Col,
  Row,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 1,
    },

    sm: {
      span: 8,
      offset: 2,
    },
  },
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [size, setSize] = useState(8);
  <Slider value={size} onChange={(value) => setSize(value)} />;
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    console.log("Received values of form: ", name, email, password);
    const response = await fetch("http://localhost:4500/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    navigate("/Login");
    console.warn(result);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Form>
        <Divider orientation="left">
          <Form.Item
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            value={email}
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          ></Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Space size={40}>
              <Col span={12} offset={6}>
                {" "}
                <Checkbox>
                  I have read the <a href="/Agreement">agreement</a>
                </Checkbox>
              </Col>
              <Col span={12} offset={6}>
                {" "}
                <Button onClick={onFinish} type="primary" htmlType="submit">
                  Register
                </Button>
              </Col>

              <Col span={12} offset={6}>
                {" "}
                <Link to="/Login">
                  Already User
                </Link>
              </Col>
            </Space>
          </Form.Item>
        </Divider>
      </Form>
    </Row>
  );
};
export default SignUp;
