import { Edit2, MapPin, Plus, Trash2 } from "lucide-react";

import { useEffect } from "react";
import useAddress from "../../hooks/profile/useAddress.js";

const AddressSection = () => {
  const {
    addresses,

    formData,

    showForm,

    editingAddressId,

    isSubmitting,

    handleChange,

    openAddForm,

    openEditForm,

    closeForm,

    handleSubmit,

    handleDelete,
  } = useAddress();

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <section className="card">
      <div className="profile-address__header">
        <div>
          <h2 className="section-title">Saved Addresses</h2>

          <p className="section-subtitle">Manage your delivery addresses.</p>
        </div>

        <button type="button" className="btn btn-primary" onClick={openAddForm}>
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {/* Address List */}

      <div className="profile-address__list">
        {addresses.length === 0 ? (
          <div className="empty-state">
            <MapPin size={40} />

            <p>No addresses added yet.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address._id} className="profile-address__card">
              <div className="profile-address__card-header">
                <div>
                  <h3>{address.label}</h3>

                  {address.isDefault && (
                    <span className="badge badge-success">Default</span>
                  )}
                </div>

                <div className="profile-address__actions">
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => openEditForm(address)}
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(address._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p>{address.receiverName}</p>

              <p>{address.street}</p>

              <p>
                {address.city}, {address.state}
              </p>

              <p>
                {address.zipcode}, {address.country}
              </p>

              {address.landmark && <p>Landmark: {address.landmark}</p>}
            </div>
          ))
        )}
      </div>

      {/* Address Form */}

      {showForm && (
        <form className="form profile-address__form" onSubmit={handleSubmit}>
          <h3>{editingAddressId ? "Edit Address" : "Add Address"}</h3>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Address Label</label>

              <select
                name="label"
                className="form-input"
                value={formData.label}
                onChange={handleChange}
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Receiver Name</label>

              <input
                className="form-input"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street</label>

              <input
                className="form-input"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Landmark</label>

              <input
                className="form-input"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>

              <input
                className="form-input"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>

              <input
                className="form-input"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Zip Code</label>

              <input
                className="form-input"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>

              <input
                className="form-input"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            Set as default address
          </label>

          <div className="address-form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : editingAddressId
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AddressSection;
