import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue","Red","Orange"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS","Canon","Nikon","HP","Sony","Nokia",
    "Huawei","Dell"],
    color: "",
    brand: "",
  };   
const ProductUpdate = ({match}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  
  const {slug} = match.params
  useEffect(()=> {
      loadProduct()
  },[]);

  const loadProduct = () =>{
      getProduct(slug)
      .then(p=>{
          setValues({...values,...p.data});
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
        <h4>Product Update</h4>
        {JSON.stringify(slug)}
          <hr />
           </div>
          </div>
    </div>
  );
};

export default ProductUpdate;
