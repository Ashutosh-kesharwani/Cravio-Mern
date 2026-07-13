import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets.js";
import { API_BASE_URL } from "../../config/constants.js";
import "./AddFood.css";
const AddFood = () => {
  // Create a url var

  // State for image
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "", // this is default category for select option
    price: "",
  });

  // Create Generic handleChange
  const handleChange = (e) => {
    // Each input field has two thing its name that we given in input name attr
    // value : which we give in input field or the value to shown
    const { name, value } = e.target;

    // set that value dynamically to be also shown and get store in name field
    // i.e Value enter by user must store in name field
    setData({ ...data, [name]: value });
  };

  // Debug using useEffect
  // useEffect(() => console.log(data), [data]);

  // Generic Handle Submit
  const handleSubmit = async (e) => {
    // First prevent default action of submit , which is after click submit button reload the page
    e.preventDefault();

    // first we have convert our generic data which we have store in state in the type Form-Data , then we have to send it
    // Create a new Form data object
    const formData = new FormData();
    // Append each data one by one in formData
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price)); // As typecast price field which is str rightnow into number to store in db, as in db we have use number type field , to prevent the error
    formData.append("image", image);

    // Send Req
    // For send req to server to post these data we use axios
    // Axios method we send two thing the Api endpoint we have created in backend and the data which we have to send , here as we have also send the file so we send data in form of formData.
    // Note : Axios Response
    // 1. Response we get from axios , it already convert into json , unlike fetch
    // 2. For accessing the data which we have send in response , hame uss response.data.field here field can be success , data or other value which we have send in reponse
    // In backend the response we create using ApiResponse class we use it here , so there we also add success flag so use it here to check if res we get is success or not
    const response = await axios.post(`${API_BASE_URL}/foods`, formData);

    // console.log(response.data.data);
    // console.log(response.data.success);
    // console.log(response.message);

    // Check if request was successful or not with success flag.

    if (response.data.success) {
      // If req has sent and successfully and response received
      // Reset the form
      setData({
        name: "",
        description: "",
        category: "Salad", // this is default category for select option
        price: "",
      });
      // set file to also false
      setImage(false);
      // Use toastify to display popup message
      toast.success(response.data.message);
    } else {
      // Display error also with toastify , if we get some error
      toast.error(response.data.message);
    }
  };
  return (
    <div className="add">
      <form
        encType="multipart/form-data"
        className="flex-col"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
            {/* Here Preview Image after uploading : src={image ? URL.createObjectURL(image) : assets.upload_area} this line means if image has provided by user then create a url object with URL class and show it uploaded image ko show karo , else if not then by def upload icon ko show karo */}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Type here"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            id="description"
            rows="6"
            placeholder="Write content here"
            required
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="add-category-price ">
          <div className="add-category flex-col">
            <p>Product category</p>
            {/* 
            Select
            In Select field we only pass handleChange func ref in onChange event 
            > As value we have already provided hardcoded in option
            */}
            <select name="category" id="category" onChange={handleChange}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              value={data.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddFood;
