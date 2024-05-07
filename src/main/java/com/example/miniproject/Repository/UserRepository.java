package com.example.miniproject.Repository;

import com.example.miniproject.Model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserModel, String> {
    // Define custom repository methods if needed
}
