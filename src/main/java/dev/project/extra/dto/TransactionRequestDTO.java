package dev.project.extra.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record TransactionRequestDTO(
        @NotBlank(message = "Transaction name cannot be blank.")
        @Size(min = 3, max = 50, message = "Transaction name must be between 3 to 50 characters")
        String item,

        @NotNull(message = "Amount cannot be null.")
        @Min(value = 1, message = "Amount cannot be less than 1")
        BigDecimal amount,

        Long categoryId,

        @NotNull(message = "Flow type must not be null.")
        Long flowId,

        @NotNull(message = "User must not be null.")
        Long userId
) {

}
