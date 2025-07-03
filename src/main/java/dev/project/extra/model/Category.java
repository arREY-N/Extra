package dev.project.extra.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Category name must not be blank.")
    @Size(min = 3, max = 50, message = "Category name must be between 3 to 50 characters.")
    private String name;

    public Category() {}
    public Category(String name){
        this.name = name;
    }
}
