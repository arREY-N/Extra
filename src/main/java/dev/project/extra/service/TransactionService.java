package dev.project.extra.service;

import dev.project.extra.dto.TransactionRequestDTO;
import dev.project.extra.dto.TransactionResponseDTO;
import dev.project.extra.exception.ResourceNotFoundException;
import dev.project.extra.mapper.CategoryMapper;
import dev.project.extra.mapper.FlowMapper;
import dev.project.extra.mapper.TransactionMapper;
import dev.project.extra.mapper.UserMapper;
import dev.project.extra.model.Category;
import dev.project.extra.model.Flow;
import dev.project.extra.model.Transaction;
import dev.project.extra.model.User;
import dev.project.extra.repository.CategoryRepository;
import dev.project.extra.repository.FlowRepository;
import dev.project.extra.repository.TransactionRepository;
import dev.project.extra.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final UserRepository userRepository;
    private final FlowRepository flowRepository;
    private final CategoryRepository categoryRepository;

    public TransactionService(
            TransactionRepository transactionRepository,
            TransactionMapper transactionMapper,
            UserRepository userRepository,
            UserMapper userMapper,
            FlowRepository flowRepository,
            FlowMapper flowMapper,
            CategoryRepository categoryRepository,
            CategoryMapper categoryMapper
    ){
        this.transactionRepository = transactionRepository;
        this.transactionMapper = transactionMapper;
        this.userRepository = userRepository;
        this.flowRepository = flowRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<TransactionResponseDTO> getAllTransactions(){
        return transactionRepository.findAll()
                .stream()
                .map(transactionMapper::transactionToTransactionResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public TransactionResponseDTO getTransactionById(Long id){
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + id));

        return transactionMapper.transactionToTransactionResponseDto(transaction);
    }

    @Transactional(readOnly = true)
    public List<TransactionResponseDTO> getUserTransactions(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id ));
        return transactionMapper.transactionListToTransactionResponseDtoList(transactionRepository.findByUser(user));
    }

    @Transactional(readOnly = true)
    public BigDecimal getTotalExpenses(Long id){
        return getUserTransactions(id)
                .stream()
                .map(TransactionResponseDTO::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional(readOnly = true)
    public List<TransactionResponseDTO> getExpensesBetweenDates(Long id, LocalDateTime start, LocalDateTime end){
        List<Transaction> transactions = transactionRepository
                .findByUser_IdAndTransactionDateBetween(
                        id,
                        start,
                        Objects.requireNonNullElseGet(end, LocalDateTime::now));

        return transactionMapper.transactionListToTransactionResponseDtoList(transactions);
    }

    @Transactional
    public TransactionResponseDTO createTransaction(TransactionRequestDTO request){
        Transaction transaction = transactionMapper.requestToTransaction(request);

        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + request.userId()));

        Flow flow = flowRepository.findById(request.flowId())
                .orElseThrow(() -> new ResourceNotFoundException("Flow not found with id " + request.flowId()));

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + request.categoryId()));

        transaction.setUser(user);
        transaction.setFlow(flow);
        transaction.setCategory(category);
        transaction.setTransactionDate(LocalDateTime.now());

        return transactionMapper.transactionToTransactionResponseDto(transactionRepository.save(transaction));
    }

    @Transactional
    public TransactionResponseDTO updateTransaction(Long id, TransactionRequestDTO requestDTO){
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + id ));

        transactionMapper.updateTransactionFromTransactionRequestDto(requestDTO, transaction);

        return transactionMapper.transactionToTransactionResponseDto(transactionRepository.save(transaction));
    }

    @Transactional
    public void deleteTransaction(Long id){
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + id));

        transactionRepository.delete(transaction);
    }

}
