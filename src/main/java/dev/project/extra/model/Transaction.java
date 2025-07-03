package dev.project.extra.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item", nullable = false)
    @NotBlank(message = "Transaction name cannot be blank.")
    @Size(min = 3, max = 50, message = "Transaction name must be between 3 to 50 characters")
    private String item;

    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    @NotNull(message = "Amount cannot be null.")
    @Min(value = 1, message = "Amount cannot be less than 1")
    private BigDecimal amount;

    @Column(name = "transaction_date", nullable = false)
    @NotNull(message = "Transaction date cannot be null")
    private LocalDateTime transactionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flow_id", nullable = false)
    @NotNull(message = "Flow type must not be null.")
    private Flow flow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User must not be null.")
    private User user;

    public Transaction() {
        this.transactionDate = LocalDateTime.now();
    }

    public Transaction(String item, BigDecimal amount, Category category, Flow flow, User user){
        this.item = item;
        this.amount = amount;
        this.category = category;
        this.flow = flow;
        this.user = user;
        this.transactionDate = LocalDateTime.now();
    }
}
