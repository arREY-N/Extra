package dev.project.extra.controller;

import dev.project.extra.dto.TransactionRequestDTO;
import dev.project.extra.dto.TransactionResponseDTO;
import dev.project.extra.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions(){
        System.out.println("Get mapping received");
        return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> getTransactionById(@PathVariable Long id){
        return new ResponseEntity<>(transactionService.getTransactionById(id), HttpStatus.OK);
    }

    @GetMapping("/user/{id}/by-date-range")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByIdAndDate(
            @PathVariable Long id,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
    ) {
      List<TransactionResponseDTO> transactions = transactionService.getExpensesBetweenDates(id, start, end);

      return new ResponseEntity<>(transactions, HttpStatus.OK);
    }


    @GetMapping("/user/{id}/total")
    public ResponseEntity<BigDecimal> getUserExpenses(@PathVariable Long id){
        return new ResponseEntity<>(transactionService.getTotalExpenses(id), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<TransactionResponseDTO>> getUserTransactions(@PathVariable Long id){
        return new ResponseEntity<>(transactionService.getUserTransactions(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> createTransaction(@Valid @RequestBody TransactionRequestDTO requestDTO){
        TransactionResponseDTO created = transactionService.createTransaction(requestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> updateTransaction(@PathVariable Long id, @Valid @RequestBody TransactionRequestDTO requestDTO){
        TransactionResponseDTO responseDTO = transactionService.updateTransaction(id, requestDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id){
        transactionService.deleteTransaction(id);

        return ResponseEntity.noContent().build();
    }
}
