package com.example.miniproject.Repository;


import com.example.miniproject.Model.ItemCategoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemCategoryRepository extends MongoRepository<ItemCategoryModel, String> {
}
