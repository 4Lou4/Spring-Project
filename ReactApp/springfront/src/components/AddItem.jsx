import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleFill } from 'react-bootstrap-icons'; // Import Bootstrap Icons
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addItem = async () => {
    console.log(newItemName, newItemPrice, newItemCategory);
    
    // Find the selected category object
    const selectedCategory = categories.find(category => category.id === newItemCategory);

    // Extract the category ID
    const categoryId = selectedCategory ? selectedCategory.id : null;

    // Send the category ID along with other item data
    await axios.post('http://localhost:9000/api/v1/items', { name: newItemName, price: newItemPrice, categoryId })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setNewItemName('');
    setNewItemPrice('');
    setNewItemCategory('');
  };


  const handleNameChange = (e) => {
    setNewItemName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setNewItemPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setNewItemCategory(e.target.value);
  };

  return (
    <div className="container py-5" style={{background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)'}}>
      <h2 className="my-3 text-white">Add Item</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newItemName}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={newItemPrice}
          onChange={handlePriceChange}
        />
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          value={newItemCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-outline-light" onClick={addItem}>
        <PlusCircleFill /> Add Item {/* Bootstrap Icon */}
      </button>
    </div>
  );
};

export default AddItem;
