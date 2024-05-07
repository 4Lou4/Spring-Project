package com.example.miniproject.Services;

import com.example.miniproject.Model.ItemCategoryModel;
import com.example.miniproject.Repository.ItemCategoryRepository;
import com.example.miniproject.Repository.ItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCategoryService {

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @Autowired
    private ItemRepository itemRepository;

    public List<ItemCategoryModel> getAllItemCategories() {
        return itemCategoryRepository.findAll();
    }

    public ItemCategoryModel getItemCategory(String id) {
        return itemCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot Find Item Category By ID: " + id));
    }

    public ItemCategoryModel saveItemCategory(ItemCategoryModel categoryModel) {
        return itemCategoryRepository.insert(categoryModel);
    }

    public ItemCategoryModel updateItemCategory(String id, ItemCategoryModel item) {
        ItemCategoryModel imFromDB = getItemCategory(id);
        BeanUtils.copyProperties(item, imFromDB);
        return itemCategoryRepository.save(imFromDB);
    }

    public void deleteItemCategory(String id) {
        itemRepository.deleteAllByCategoryId(id);
        itemCategoryRepository.deleteById(id);
    }
}
