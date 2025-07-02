package dev.project.extra.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

public record CategoryRequestDTO(
        @NotNull(message = "Category name must not be null.")
        @Size(min = 3, max = 50, message = "Category name must be 3 to 50 characters.")
        String name
) {

}
