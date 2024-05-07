import { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare } from 'react-bootstrap-icons'; // Import Bootstrap Icons
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate from react-router-dom

const EditItem = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/items/${id}`);
      setItemName(response.data.name);
      setItemPrice(response.data.price);
      setItemCategory(response.data.category);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchItem();
    fetchCategories();
  }, []);

  const updateItem = async () => {
    const selectedCategory = categories.find(category => category.id === itemCategory);
    const categoryId = selectedCategory ? selectedCategory.id : null;

    await axios.put(`http://localhost:9000/api/v1/items/${id}`, { name: itemName, price: itemPrice, categoryId })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setItemCategory(e.target.value);
  };

  return (
    <div className="container py-5" style={{background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)'}}>
      <h2 className="my-3 text-white">Edit Item</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={itemName}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={itemPrice}
          onChange={handlePriceChange}
        />
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          value={itemCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-outline-light" onClick={updateItem}>
        <PencilSquare /> Update Item {/* Bootstrap Icon */}
      </button>
    </div>
  );
};

export default EditItem;