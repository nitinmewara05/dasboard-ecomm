import './App.css';
import 'antd/dist/reset.css';
import Nav from "./component/Nav"
import Login from './component/Login';
import SignUp from './component/SignUp';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList'
import Agreement from './component/Agreement';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
<Route path= "/home" element ={<Nav/>}>
<Route path= "AddProduct" element ={<AddProduct/>}/>
<Route path= "updateProduct/:id" element ={<AddProduct/>}/>
<Route path= "ProductList" element ={<ProductList/>}/>
<Route path ="Agreement" element = {<Agreement/>}/>

</Route>

<Route path="/login" element={<Login/>} />
<Route path= "/Signup" element ={<SignUp/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
