// import React, { useState } from 'react';
// import './admin.css';

// const AddProductModal = ({ onClose, onSuccess }) => {

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     inventory: '',
//     brand: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await fetch('/api/admin/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(formData)
//       });

//       onSuccess();

//     } catch (error) {
//       console.error("Add product failed:", error);
//     }
//   };

//   return (
//     <div className="modal-overlay">

//       <div className="modal-box">
//         <h3 className="modal-title">Add New Product</h3>

//         <form className="modal-form" onSubmit={handleSubmit}>

//           <input 
//             type="text" 
//             placeholder="Product Name"
//             value={formData.name}
//             onChange={(e)=>setFormData({...formData, name:e.target.value})}
//             required
//           />

//           <input 
//             type="number" 
//             placeholder="Price"
//             value={formData.price}
//             onChange={(e)=>setFormData({...formData, price:e.target.value})}
//             required
//           />

//           <input 
//             type="text" 
//             placeholder="Category"
//             value={formData.category}
//             onChange={(e)=>setFormData({...formData, category:e.target.value})}
//             required
//           />

//           <input 
//             type="number" 
//             placeholder="Inventory"
//             value={formData.inventory}
//             onChange={(e)=>setFormData({...formData, inventory:e.target.value})}
//             required
//           />

//           <textarea
//             placeholder="Description"
//             rows="3"
//             value={formData.description}
//             onChange={(e)=>setFormData({...formData, description:e.target.value})}
//             required
//           />

//           <div className="modal-actions">
//             <button type="button" className="btn-cancel" onClick={onClose}>
//               Cancel
//             </button>

//             <button type="submit" className="btn-primary">
//               Add Product
//             </button>
//           </div>

//         </form>
//       </div>

//     </div>
//   );
// };

// export default AddProductModal;
import React, { useState } from "react";
import "./admin.css";

const AddProductModal = ({ onClose, onSuccess }) => {
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
    brand: "",
  });

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // ✅ Add Color
  const [colorInput, setColorInput] = useState("");
  const addColor = () => {
    if (colorInput.trim() !== "") {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  // ✅ Remove Color
  const removeColor = (c) => {
    setColors(colors.filter((color) => color !== c));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();

      // ✅ Main product fields
      sendData.append("name", formData.name);
      sendData.append("description", formData.description);
      sendData.append("price", formData.price);
      sendData.append("category", formData.category);
      sendData.append("inventory", formData.inventory);
      sendData.append("brand", formData.brand);

      // ✅ Colors (send as JSON)
      sendData.append("colors", JSON.stringify(colors));

      // ✅ Images
      images.forEach((img) => {
        sendData.append("images", img);
      });

      await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: sendData,
      });

      onSuccess();
    } catch (error) {
      console.error("Add product failed:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Add New Product</h3>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Inventory"
            value={formData.inventory}
            onChange={(e) =>
              setFormData({ ...formData, inventory: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          {/* ✅ IMAGE UPLOAD */}
          <label className="input-label">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="file-upload"
          />

          {/* ✅ COLOR INPUT */}
          <label className="input-label">Colors</label>
          <div className="color-row">
            <input
              type="text"
              placeholder="Enter color (e.g. #ff0000, red)"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <button type="button" className="btn-add" onClick={addColor}>
              Add
            </button>
          </div>

          {/* ✅ SHOW ADDED COLORS */}
          <div className="color-list">
            {colors.map((c, index) => (
              <div key={index} className="color-chip">
                <span
                  className="color-dot"
                  style={{ background: c }}
                ></span>
                {c}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeColor(c)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ✅ ACTION BUTTONS */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
