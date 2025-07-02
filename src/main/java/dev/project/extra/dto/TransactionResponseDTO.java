package dev.project.extra.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionResponseDTO(
        Long id,
        String item,
        BigDecimal amount,
        LocalDateTime transactionDate,
        String category,
        String flow,
        String user
) {
}
