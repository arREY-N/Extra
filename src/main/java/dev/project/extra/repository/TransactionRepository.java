package dev.project.extra.repository;

import dev.project.extra.model.Category;
import dev.project.extra.model.Flow;
import dev.project.extra.model.Transaction;
import dev.project.extra.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);
    List<Transaction> findByCategory(Category category);
    List<Transaction> findByFlow(Flow flow);
    List<Transaction> findByUserAndCategory(User user, Category category);
    List<Transaction> findByUserAndFlow(User user, Flow flow);
    List<Transaction> findByUserAndFlowAndCategory(User user, Flow flow, Category category);
    List<Transaction> findByUser_IdAndTransactionDateBetween(Long id, LocalDateTime start, LocalDateTime end);
}
