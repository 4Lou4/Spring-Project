package com.example.miniproject.Repository;
import com.example.miniproject.Model.ItemModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<ItemModel, String> {
    public void deleteAllByCategoryId(String categoryId);
    //public List<ItemModel> findAllByCategoryId(String categoryId);
}
