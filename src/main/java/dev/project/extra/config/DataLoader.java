package dev.project.extra.config;

import dev.project.extra.dto.CategoryRequestDTO;
import dev.project.extra.dto.CategoryResponseDTO;
import dev.project.extra.dto.FlowRequestDTO;
import dev.project.extra.dto.FlowResponseDTO;
import dev.project.extra.dto.TransactionRequestDTO;
import dev.project.extra.dto.UserRequestDTO;
import dev.project.extra.dto.UserResponseDTO;
import dev.project.extra.repository.CategoryRepository;
import dev.project.extra.repository.FlowRepository;
import dev.project.extra.repository.TransactionRepository;
import dev.project.extra.repository.UserRepository;
import dev.project.extra.service.CategoryService;
import dev.project.extra.service.FlowService;
import dev.project.extra.service.TransactionService;
import dev.project.extra.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal; // Import BigDecimal for amount
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataLoader {

    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);

    private final UserService userService;
    private final CategoryService categoryService;
    private final FlowService flowService;
    private final TransactionService transactionService;
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final FlowRepository flowRepository;
    private final TransactionRepository transactionRepository;


    public DataLoader(UserService userService, CategoryService categoryService,
                      FlowService flowService, TransactionService transactionService,
                      PasswordEncoder passwordEncoder, UserRepository userRepository,
                      CategoryRepository categoryRepository, FlowRepository flowRepository,
                      TransactionRepository transactionRepository) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.flowService = flowService;
        this.transactionService = transactionService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.flowRepository = flowRepository;
        this.transactionRepository = transactionRepository;
    }

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            log.info("--- Starting Database Data Population ---");

            // 1. Populate Users
            List<UserResponseDTO> users = populateUsers();

            // 2. Populate Categories
            List<CategoryResponseDTO> categories = populateCategories();

            // 3. Populate Flows
            List<FlowResponseDTO> flows = populateFlows();

            // 4. Populate Transactions (requires existing Users, Categories, Flows)
            if (!users.isEmpty() && !categories.isEmpty() && !flows.isEmpty()) {
                populateTransactions(users, categories, flows);
            } else {
                log.warn("Skipping Transaction population: Dependent entities (Users, Categories, Flows) are empty or not populated.");
            }

            log.info("--- Database Data Population Complete ---");
        };
    }

    private List<UserResponseDTO> populateUsers() {
        if (userRepository.count() == 0) {
            log.info("Populating initial User data...");
            // Usernames and passwords now strictly adhere to min 8 characters.
            // Email is removed as per UserRequestDTO.
            UserRequestDTO user1 = new UserRequestDTO("aliceUser", "password123");
            UserRequestDTO user2 = new UserRequestDTO("bobSmiths", "securePass");
            UserRequestDTO user3 = new UserRequestDTO("charlieD", "longPassword");
            UserRequestDTO user4 = new UserRequestDTO("dianaPaaa", "anotherPassword");
            UserRequestDTO user5 = new UserRequestDTO("eveGreen", "veryStrongPass");

            return List.of(
                    userService.createUser(user1),
                    userService.createUser(user2),
                    userService.createUser(user3),
                    userService.createUser(user4),
                    userService.createUser(user5)
            );
        } else {
            log.info("Users table already contains data. Skipping user population.");
            return userRepository.findAll().stream()
                    .map(user -> new UserResponseDTO(user.getId(), user.getUsername()))
                    .toList();
        }
    }

    private List<CategoryResponseDTO> populateCategories() {
        if (categoryRepository.count() == 0) {
            log.info("Populating initial Category data...");
            CategoryRequestDTO cat1 = new CategoryRequestDTO("Food Expenses");
            CategoryRequestDTO cat2 = new CategoryRequestDTO("Transportation Costs");
            CategoryRequestDTO cat3 = new CategoryRequestDTO("Utility Bills");
            CategoryRequestDTO cat4 = new CategoryRequestDTO("Entertainment Fun");
            CategoryRequestDTO cat5 = new CategoryRequestDTO("Online Shopping Spree");

            return List.of(
                    categoryService.createCategory(cat1),
                    categoryService.createCategory(cat2),
                    categoryService.createCategory(cat3),
                    categoryService.createCategory(cat4),
                    categoryService.createCategory(cat5)
            );
        } else {
            log.info("Categories table already contains data. Skipping category population.");
            return categoryRepository.findAll().stream()
                    .map(category -> new CategoryResponseDTO(category.getId(), category.getName()))
                    .toList();
        }
    }

    private List<FlowResponseDTO> populateFlows() {
        if (flowRepository.count() == 0) {
            log.info("Populating initial Flow data...");
            FlowRequestDTO flow1 = new FlowRequestDTO("Income Source");
            FlowRequestDTO flow2 = new FlowRequestDTO("Daily Expense");
            FlowRequestDTO flow3 = new FlowRequestDTO("Investment Allocation");
            FlowRequestDTO flow4 = new FlowRequestDTO("Savings Contributions");
            FlowRequestDTO flow5 = new FlowRequestDTO("Debt Repayment");

            return List.of(
                    flowService.createFlow(flow1),
                    flowService.createFlow(flow2),
                    flowService.createFlow(flow3),
                    flowService.createFlow(flow4),
                    flowService.createFlow(flow5)
            );
        } else {
            log.info("Flows table already contains data. Skipping flow population.");
            return flowRepository.findAll().stream()
                    .map(flow -> new FlowResponseDTO(flow.getId(), flow.getName()))
                    .toList();
        }
    }

    private void populateTransactions(List<UserResponseDTO> users, List<CategoryResponseDTO> categories, List<FlowResponseDTO> flows) {
        if (transactionRepository.count() == 0) {
            log.info("Populating initial Transaction data...");

            if (users.size() < 2 || categories.size() < 3 || flows.size() < 2) {
                log.warn("Not enough base data (users, categories, flows) to create diverse transactions. Skipping.");
                return;
            }

            // Transaction 1: Alice - Food Expenses - Daily Expense
            TransactionRequestDTO t1 = new TransactionRequestDTO(
                    "Weekly Groceries",
                    new BigDecimal("50.75"),
                    users.get(0).id(),
                    categories.get(0).id(),
                    flows.get(1).id()
            );

            // Transaction 2: Bob - Transportation Costs - Daily Expense
            TransactionRequestDTO t2 = new TransactionRequestDTO(
                    "Bus Fare Payment",
                    new BigDecimal("15.00"),
                    users.get(1).id(),
                    categories.get(1).id(),
                    flows.get(1).id()
            );

            // Transaction 3: Charlie - Utility Bills - Income Source
            TransactionRequestDTO t3 = new TransactionRequestDTO(
                    "Monthly Salary",
                    new BigDecimal("1500.00"),
                    users.get(2).id(),
                    categories.get(2).id(),
                    flows.get(0).id()
            );

            // Transaction 4: Alice - Entertainment Fun - Daily Expense
            TransactionRequestDTO t4 = new TransactionRequestDTO(
                    "Movie Tickets",
                    new BigDecimal("80.50"),
                    users.get(0).id(),
                    categories.get(3).id(),
                    flows.get(1).id()
            );

            // Transaction 5: Bob - Online Shopping Spree - Daily Expense
            TransactionRequestDTO t5 = new TransactionRequestDTO(
                    "New Clothing Purchase",
                    new BigDecimal("200.00"),
                    users.get(1).id(),
                    categories.get(4).id(),
                    flows.get(1).id()
            );

            try {
                transactionService.createTransaction(t1);
                transactionService.createTransaction(t2);
                transactionService.createTransaction(t3);
                transactionService.createTransaction(t4);
                transactionService.createTransaction(t5);
                log.info("Created 5 sample transactions.");
            } catch (Exception e) {
                log.error("Failed to create sample transactions: {}", e.getMessage());
            }

        } else {
            log.info("Transactions table already contains data. Skipping transaction population.");
        }
    }
}