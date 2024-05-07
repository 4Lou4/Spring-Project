import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashFill, PencilSquare } from 'react-bootstrap-icons'; // Import Bootstrap Icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ItemList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/items');
      const itemsWithCategoryNames = await Promise.all(response.data.map(async item => {
        if (item.categoryId) {
          const categoryResponse = await axios.get(`http://localhost:9000/api/v1/categories/${item.categoryId}`);
          return { ...item, category: { name: categoryResponse.data.name } };
        } else {
          return { ...item, category: { name: 'No category' } };
        }
      }));
      setItems(itemsWithCategoryNames);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container py-5" style={{background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)'}}>
      <h1 className="my-3 text-white">Item List</h1>
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price}</p>
                <p className="card-text">{item.categoryId ? item.category.name : 'No category'}</p> {/* Handle missing or null category */}
                <div className="d-flex justify-content-between">
                  <Link to={`/edit-item/${item.id}`} className="btn btn-primary">
                    <PencilSquare /> {/* Bootstrap Icon */}
                  </Link>
                  <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>
                    <TrashFill /> {/* Bootstrap Icon */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add-item" className="btn btn-outline-light">
        Add Item
      </Link>
    </div>
  );
};

export default ItemList;