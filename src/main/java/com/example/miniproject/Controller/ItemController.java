package com.example.miniproject.Controller;

import com.example.miniproject.Model.ItemModel;
import com.example.miniproject.Services.ItemService;
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
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/items")
    public List<ItemModel> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/items/{id}")
    public ItemModel getItem(@PathVariable String id) {
        return itemService.getItem(id);
    }

    @PostMapping("/items")
    public ResponseEntity<String> saveItem(@RequestBody ItemModel item) {
        ItemModel savedItem = itemService.saveItem(item);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedItem.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<ItemModel> updateItem(@PathVariable String id, @RequestBody ItemModel item) {
        ItemModel updatedItem = itemService.updateItem(id, item);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @PatchMapping("/items/{id}")
    public ResponseEntity<ItemModel> updateItemPrice(@PathVariable String id, @RequestBody ItemModel item) {
        ItemModel updatedItem = itemService.updateItemPrice(id, item);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
        return ResponseEntity.ok(id);
    }
}
