package com.example.miniproject.Services;

import com.example.miniproject.Model.ItemModel;
import com.example.miniproject.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<ItemModel> getAllItems() {
        return itemRepository.findAll();
    }

    public ItemModel getItem(String id) {
        return itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Cannot Find Item By ID: " + id));
    }

    public ItemModel saveItem(ItemModel item) {
        // Ensure that the categoryId is set in the item
        String categoryId = item.getCategoryId(); // Assuming getCategoryId() returns the category ID
        item.setCategoryId(categoryId);

        // Now save the item with the category ID
        return itemRepository.insert(item);
    }

    public ItemModel updateItem(String id, ItemModel newItem) {
        ItemModel existingItem = getItem(id);
        existingItem.setName(newItem.getName());
        existingItem.setPrice(newItem.getPrice());
        return itemRepository.save(existingItem);
    }

    public ItemModel updateItemPrice(String id, ItemModel item) {
        ItemModel existingItem = getItem(id);
        existingItem.setPrice(item.getPrice());
        return itemRepository.save(existingItem);
    }

    public void deleteItem(String id) {
        itemRepository.deleteById(id);
    }
}
