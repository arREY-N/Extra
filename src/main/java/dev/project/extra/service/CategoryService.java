package dev.project.extra.service;

import dev.project.extra.dto.CategoryRequestDTO;
import dev.project.extra.dto.CategoryResponseDTO;
import dev.project.extra.exception.DuplicateCategoryException;
import dev.project.extra.exception.ResourceNotFoundException;
import dev.project.extra.mapper.CategoryMapper;
import dev.project.extra.model.Category;
import dev.project.extra.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper){
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponseDTO> getAllCategories(){
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::categoryToCategoryResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponseDTO getCategoryById(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));

        return categoryMapper.categoryToCategoryResponseDto(category);
    }

    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequest){
        if(categoryRepository.existsByName(categoryRequest.name())){
            throw new DuplicateCategoryException("Category exists already.");
        }

        Category category = categoryMapper.categoryRequestDtoToCategory(categoryRequest);

        Category savedCategory = categoryRepository.save(category);

        return categoryMapper.categoryToCategoryResponseDto(savedCategory);
    }

    @Transactional
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO categoryRequest){
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));

        categoryMapper.updateCategoryFromCategoryRequestDto(categoryRequest, existing);

        return categoryMapper.categoryToCategoryResponseDto(categoryRepository.save(existing));
    }

    @Transactional
    public void deleteCategory(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));

        categoryRepository.delete(category);
    }
}
