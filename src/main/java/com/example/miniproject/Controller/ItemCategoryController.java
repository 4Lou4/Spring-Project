package com.example.miniproject.Controller;

import com.example.miniproject.Model.ItemCategoryModel;
import com.example.miniproject.Services.ItemCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryService itemCategoryService;

    @GetMapping("/categories")
    public List<ItemCategoryModel> getAllItemCategories() {
        return itemCategoryService.getAllItemCategories();
    }

    @GetMapping("/categories/{id}")
    public ItemCategoryModel getItemCategory(@PathVariable String id) {
        return itemCategoryService.getItemCategory(id);
    }

    @PostMapping("/categories")
    public ResponseEntity<String> saveItemCategory(@RequestBody ItemCategoryModel categoryModel) {
        ItemCategoryModel savedItem = itemCategoryService.saveItemCategory(categoryModel);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedItem.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ItemCategoryModel> updateItemCategory(@PathVariable String id, @RequestBody ItemCategoryModel item) {
        ItemCategoryModel updatedItem = itemCategoryService.updateItemCategory(id, item);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteItemCategory(@PathVariable String id) {
        itemCategoryService.deleteItemCategory(id);
        return ResponseEntity.ok(id);
    }
}