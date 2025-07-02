package dev.project.extra.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        @NotNull(message = "Username cannot be null.")
        @Size(min = 8, max = 50, message = "Username must be between 8 to 50 characters.")
        String username,

        @NotNull(message = "Password cannot be null")
        @Size(min = 8, message = "Password must be at least 8 characters.")
        String password
) {

}
