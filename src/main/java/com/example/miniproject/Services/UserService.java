package com.example.miniproject.Services;

import com.example.miniproject.Model.UserModel;
import com.example.miniproject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel getUser(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot Find User By ID: " + id));
    }

    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel updateUser(String id, UserModel newUser) {
        UserModel existingUser = getUser(id);
        existingUser.setUsername(newUser.getUsername());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setPassword(newUser.getPassword()); // Update password
        // Update other user properties as needed
        return userRepository.save(existingUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

}
