// import React, { useState } from 'react';
// import './admin.css';

// const EditProductModal = ({ product, onClose, onSuccess }) => {

//   const [formData, setFormData] = useState({
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     category: product.category,
//     inventory: product.inventory
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await fetch(`/api/admin/products/${product._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(formData)
//       });

//       onSuccess();

//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   return (
//     <div className="modal-overlay">

//       <div className="modal-box">
//         <h3 className="modal-title">Edit Product</h3>

//         <form className="modal-form" onSubmit={handleSubmit}>

//           <input 
//             type="text" 
//             value={formData.name}
//             onChange={(e)=>setFormData({...formData, name:e.target.value})}
//             required
//           />

//           <input 
//             type="number" 
//             value={formData.price}
//             onChange={(e)=>setFormData({...formData, price:e.target.value})}
//             required
//           />

//           <input 
//             type="text" 
//             value={formData.category}
//             onChange={(e)=>setFormData({...formData, category:e.target.value})}
//             required
//           />

//           <input 
//             type="number" 
//             value={formData.inventory}
//             onChange={(e)=>setFormData({...formData, inventory:e.target.value})}
//             required
//           />

//           <textarea
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
//               Update Product
//             </button>
//           </div>

//         </form>
//       </div>

//     </div>
//   );
// };

// export default EditProductModal;
import React, { useState } from 'react';
import './admin.css';

const AddProductModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inventory: '',
    sizes: [],
    colors: [],
    images: []
  });

  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  const addSize = () => {
    if (!sizeInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, sizeInput.trim()]
    }));
    setSizeInput("");
  };

  const removeSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const addColor = () => {
    if (!colorInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, colorInput.trim()]
    }));
    setColorInput("");
  };

  const removeColor = (c) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(col => col !== c)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("category", formData.category);
    fd.append("inventory", formData.inventory);

    fd.append("sizes", JSON.stringify(formData.sizes));
    fd.append("colors", JSON.stringify(formData.colors));

    if (formData.images && formData.images.length > 0) {
      Array.from(formData.images).forEach(img => {
        fd.append("images", img);
      });
    }

    try {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: fd
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
            onChange={(e)=>setFormData({...formData, name:e.target.value})}
            required
          />

          <input 
            type="number" 
            placeholder="Price"
            value={formData.price}
            onChange={(e)=>setFormData({...formData, price:e.target.value})}
            required
          />

          <input 
            type="text" 
            placeholder="Category"
            value={formData.category}
            onChange={(e)=>setFormData({...formData, category:e.target.value})}
            required
          />

          <input 
            type="number" 
            placeholder="Inventory"
            value={formData.inventory}
            onChange={(e)=>setFormData({...formData, inventory:e.target.value})}
            required
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e)=>setFormData({...formData, description:e.target.value})}
            required
          />

          {/* SIZES */}
          <div className="chip-input-box">
            <input
              type="text"
              placeholder="Add size (e.g. S, M, L, XL)"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
            />
            <button type="button" className="btn-chip-add" onClick={addSize}>
              Add
            </button>
          </div>

          <div className="chip-container">
            {formData.sizes.map((s) => (
              <span key={s} className="chip">
                {s}
                <button type="button" onClick={() => removeSize(s)}>×</button>
              </span>
            ))}
          </div>

          {/* COLORS */}
          <div className="chip-input-box">
            <input
              type="text"
              placeholder="Add color (e.g. red, #000000)"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <button type="button" className="btn-chip-add" onClick={addColor}>
              Add
            </button>
          </div>

          <div className="chip-container">
            {formData.colors.map((c) => (
              <span key={c} className="chip">
                {c}
                <button type="button" onClick={() => removeColor(c)}>×</button>
              </span>
            ))}
          </div>

          {/* IMAGES */}
          <input
            type="file"
            multiple
            onChange={(e) => setFormData({ ...formData, images: e.target.files })}
          />

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
