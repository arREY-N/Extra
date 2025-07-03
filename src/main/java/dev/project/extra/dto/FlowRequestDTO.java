package dev.project.extra.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FlowRequestDTO(
        @NotNull(message = "Flow name must not be null")
        @Size(min = 3, max = 50, message = "Flow name must be 3 to 50 characters.")
        String name
) {

}
