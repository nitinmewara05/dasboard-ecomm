import React, { useState, useEffect } from "react";
import { Divider, Table, Button, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";



const App = () => {
  const Navigate = useNavigate();
 

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text) => <a href="/home">{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Images",
      dataIndex: "img",
      key: "img",
      render: (img, record)=>{
      return <Image width={200}  src={img}/>
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space wrap>
    <Button type="primary" onClick={() => deleteProduct(record._id)}>Delete</Button>
    <Button type="primary" onClick={()=>handleClick(record._id)}>Update</Button>
  </Space>
      ),
    },
    









    
  ];


  



  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType] = useState("checkbox");
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    getProducts();
  }, []);
  
  const handleClick = event => {
Navigate(`/home/updateProduct/${event}`)
    console.log(event);
  };
  const getProducts = async () => {
    let result = await fetch("http://localhost:4500/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4500/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  return (
    <div>
      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={products}
      />
    </div>
  );
};
export default App;
