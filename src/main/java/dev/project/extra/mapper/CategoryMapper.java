package dev.project.extra.mapper;

import dev.project.extra.dto.CategoryRequestDTO;
import dev.project.extra.dto.CategoryResponseDTO;
import dev.project.extra.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponseDTO categoryToCategoryResponseDto(Category category);
    @Mapping(target = "id", ignore = true)
    Category categoryRequestDtoToCategory(CategoryRequestDTO category);

    @Mapping(target = "id", ignore = true)
    void updateCategoryFromCategoryRequestDto(CategoryRequestDTO update, @MappingTarget Category category);

    List<CategoryResponseDTO> categoryListToCategoryResponseDto(List<Category> categories);
}
