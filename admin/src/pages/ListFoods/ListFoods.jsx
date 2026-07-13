import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/constants";
import "./ListFoods.css";

// Note we should never make our component func async , but inside it we can use multiple async lik for fetchinhg data from server and all.
const ListFoods = () => {
  // Get all food Item Req
  // First of all we have to store all food item we get from Db
  // Create a one state variable in which we default value []
  const [list, setList] = useState([]);

  // Fetched data from Api
  // Send Get req to fetch all food items
  // Now we should only fetch the data when we load this page i.e mount this component
  // In production we generally write all the fecthed functionality in userEffect , and add empty arr which denotes first time render only
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/foods`);

      // check if we get response successfully or not
      if (response.data.success) {
        // if we get data successfully then store that data in list state
        setList(response.data.data);
        // Toast message for get is not recommended
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        // toast.error("Error ");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchFoodList();
    // console.log("First render");
  }, []);

  // console.log({ list });

  // Functionality for delete food item
  const deleteFoodItem = async (id) => {
    try {
      // Send delete req for deleting this food item
      // Here we send delete with provding the id of object in url which we have to delete to server
      const response = await axios.delete(`${API_BASE_URL}/foods/${id}`);

      if (response.data.success) {
        // fethched only if response is success , as if we get error then no need to fetch the data again
        await fetchFoodList();
        // Also set the state after delete
        // instead of again setting the state what we do is that after send dele response we again fecthed the data from Db
        // setList((prev) => prev.filter((field) => field._id != id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        {/* Table col header*/}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Table col value */}
        {list.map((item) => {
          return (
            // We use if of the object that we store in backend , as it is guranteed to be unique
            <div key={item._id} className="list-table-format">
              <img src={item.image.url} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="cursor" onClick={() => deleteFoodItem(item._id)}>
                &times;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListFoods;
