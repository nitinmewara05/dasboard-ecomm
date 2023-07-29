import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb,  Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



const Nav  = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const items = [
    getItem("Profile", "1", <PieChartOutlined />),

      getItem("Store", "2", <DesktopOutlined />),
  
    
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "7"),
    ]),
    getItem("New Product", "9", <FileOutlined />),
  
    getItem("Logout", "8", <PoweroffOutlined />),
    
  ];

  const menuClicked = (value) => {
    console.log(value)
    if(value.key === '8') return logout()
    switch(value.key) {
        case "2":
          navigate("/home/ProductList")
          break;
          case "9":
            navigate("/home/AddProduct")
            break;
            case "1":
              navigate("/home")
              break;
     
      default:
        // code block
    }
  }


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          onClick={menuClicked}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Nitin Mewara</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
           <Outlet/>
          </div>
         
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Nav;
