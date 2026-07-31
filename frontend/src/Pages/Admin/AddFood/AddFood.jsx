import { useState } from "react";

import { ImagePlus } from "lucide-react";
import useFood from "../../../hooks/useFood.js";

import { toast } from "react-hot-toast";

import {
  DEFAULT_FOOD_CATEGORY,
  FOOD_CATEGORIES,
} from "../../../constants/food.constants.js";
import "./AddFood.css";

const INITIAL_FORM = {
  name: "",
  description: "",
  category: DEFAULT_FOOD_CATEGORY,
  price: "",
};

const AddFood = () => {
  const { handleCreateFood, loading } = useFood();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState(INITIAL_FORM);

  /* ---------------- Handle Change ---------------- */

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- Reset Form ---------------- */

  const resetForm = () => {
    setFormData({ ...INITIAL_FORM });

    setImage(null);
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a food image.");
      return;
    }

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("price", Number(formData.price));
    payload.append("image", image);

    try {
      await handleCreateFood(payload);

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="add-food">
      <form
        className="add-food__form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="add-food__header">
          <p>Create a delicious menu item for your customers.</p>
        </div>

        <div className="add-food__content">
          {/* LEFT */}
          <div className="add-food__upload">
            <label htmlFor="image" className="add-food__upload-box">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Food" />
              ) : (
                <>
                  <ImagePlus size={56} />

                  <h4>Upload Image</h4>

                  <span>PNG, JPG or WEBP</span>
                </>
              )}
            </label>

            <input
              id="image"
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* RIGHT */}

          <div className="add-food__details">
            <div className="add-food__field">
              <label>Food Name</label>

              <input
                name="name"
                value={formData.name}
                placeholder="Veg Burger"
                onChange={handleChange}
              />
            </div>

            <div className="add-food__field">
              <label>Description</label>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                placeholder="Write something about this food..."
                onChange={handleChange}
              />
            </div>

            <div className="add-food__row">
              <div className="add-food__field">
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {FOOD_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="add-food__field">
                <label>Price (₹)</label>

                <input
                  type="number"
                  name="price"
                  placeholder="299"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="add-food__button" disabled={loading.createFood}>
              {loading.createFood ? "Adding..." : "+ Add Food"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddFood;
