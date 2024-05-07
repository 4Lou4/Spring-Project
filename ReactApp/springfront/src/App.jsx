import { Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Login from './components/LoginPage/Login';
import SignUp from './components/LoginPage/SignUp';

function App() {
  return (
    <Routes>
        <Route path="/edit-item/:id" element={<EditItem />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/itemlist" element={<ItemList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />     
      </Routes>
  );
}

export default App;