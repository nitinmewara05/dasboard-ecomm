import { Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const [img, setImg] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [mode, setMode] = React.useState("create")
  const addProduct = async () => {
    console.warn(!name);
    if (!name || !price || !category || !company || !img) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company, img);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:4500/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, img, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    navigate("/home/ProductList");
  };

  useEffect(() => {
    console.log(params)
  if(params.id){
    setMode("update")
    getProductDetails();
  }
  }, []);
  const updateProduct = async () => {
    console.warn(name, price, company, category,img);
    let result = await fetch(`http://localhost:4500/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company, img }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log(result);
    navigate('/home/ProductList')
  };

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:4500/product/${params.id}`,{
      headers:  {
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    setImg(result.img);
  };

  const [form] = Form.useForm();
  const [formLayout] = useState("horizontal");
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  return (
    <Form
      name=",price,category,company,img"
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
    >
      {/* change mode of Add Product and Update Product */}
      {mode === 'create' ? <h1>Add Product</h1> : <h1>Update Product</h1>}

      <Form.Item label="Name">
        <Input
          placeholder="Please Enter Your Product Name"
          value = {name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {error && !name && <span className="invalid-input">Enter Valid Name</span>}
      </Form.Item>
      <Form.Item label="Price">
        <Input
          placeholder="Please Enter price of your Product"
          value = {price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        {error && !name && <span className="invalid-input">Enter Valid Price</span>}
      </Form.Item>
      <Form.Item label="Image Url">
        <Input
          placeholder="Please Enter Your Image Url"
          value = {img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        {error && !name && <span className="invalid-input">Enter Valid Image Url</span>}
      </Form.Item>
      <Form.Item label="Category">
        <Input  
          placeholder="Mention Category"
          value = {category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        {error && !name && <span className="invalid-input">Enter Valid Product category</span>}
      </Form.Item>

      <Form.Item label="Brand Name">
        <Input
          placeholder="Write your Brand Name here"
          value = {company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        {error && !name && <span className="invalid-input">Enter Valid Brand name</span>}
      </Form.Item>
      <Form.Item {...buttonItemLayout}>

      {mode === 'create' ?  <Button type="primary" onClick={addProduct}>
          Submit
        </Button> : <Button type="primary" onClick={updateProduct}>Update Product</Button>}
       
      </Form.Item>
    </Form>
  );
};
export default AddProduct;
