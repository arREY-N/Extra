package dev.project.extra.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "app_user", uniqueConstraints = @UniqueConstraint(columnNames = {"username"}))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    @NotBlank(message = "Username cannot be blank.")
    @Size(min = 8, max = 50, message = "Username must be between 8 to 50 characters.")
    private String username;

    @Column(name = "password", nullable = false)
    @Size(min = 8, message = "Password must be at least 8 characters.")
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Transaction> transactions = new ArrayList<>();

    public User(){}
    public User(String username, String password){
        this.username = username;
        this.password = password;
    }
}
