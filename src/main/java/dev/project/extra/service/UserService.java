package dev.project.extra.service;

import dev.project.extra.dto.UserRequestDTO;
import dev.project.extra.dto.UserResponseDTO;
import dev.project.extra.exception.DuplicateUsernameException;
import dev.project.extra.exception.ResourceNotFoundException;
import dev.project.extra.mapper.UserMapper;
import dev.project.extra.model.User;
import dev.project.extra.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAll(){
        return userRepository.findAll()
                .stream()
                .map(userMapper::userToUserResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found."));

        return userMapper.userToUserResponseDto(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserByUsername(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Username " + username + " not found."));

        return userMapper.userToUserResponseDto(user);
    }

    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequest){
        if(userRepository.existsByUsername(userRequest.username())){
            throw new DuplicateUsernameException("Username " + userRequest.username() + " already exists.");
        }

        User user = userMapper.userRequestDtoToUser(userRequest);

        String hashedPassword = passwordEncoder.encode(userRequest.password());
        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);
        return userMapper.userToUserResponseDto(savedUser);
    }

    @Transactional
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequest){
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found."));

        if (!existing.getUsername().equals(userRequest.username()) && userRepository.existsByUsername(userRequest.username())) {
            throw new DuplicateUsernameException("Username '" + userRequest.username() + " already exists.");
        }

        userMapper.updateUserFromUserRequestDto(userRequest, existing);

        if(userRequest.password() != null && !userRequest.password().isEmpty()){
            String hashedPassword = passwordEncoder.encode(userRequest.password());
            existing.setPassword(hashedPassword);
        }

        return userMapper.userToUserResponseDto(userRepository.save(existing));
    }

    @Transactional
    public void deleteUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User " + id + " not found."));

        userRepository.delete(user);
    }
}
