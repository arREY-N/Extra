package dev.project.extra.mapper;

import dev.project.extra.dto.TransactionRequestDTO;
import dev.project.extra.dto.TransactionResponseDTO;
import dev.project.extra.model.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "flowId", target = "flow.id")
    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(target = "transactionDate", ignore = true)
    Transaction requestToTransaction(TransactionRequestDTO requestDTO);

    @Mapping(source = "user.username", target = "user")
    @Mapping(source = "flow.name", target = "flow")
    @Mapping(source = "category.name", target = "category")
    @Mapping(source = "transactionDate", target = "transactionDate")
    TransactionResponseDTO transactionToTransactionResponseDto(Transaction transaction);

    List<TransactionResponseDTO> transactionListToTransactionResponseDtoList(List<Transaction> transactions);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "transactionDate", ignore = true)
    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(source = "flowId", target = "flow.id")
    @Mapping(source = "userId", target = "user.id")
    void updateTransactionFromTransactionRequestDto(TransactionRequestDTO update, @MappingTarget Transaction transaction);
}
