package dev.project.extra.mapper;

import dev.project.extra.dto.UserRequestDTO;
import dev.project.extra.dto.UserResponseDTO;
import dev.project.extra.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO userToUserResponseDto(User user);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "transactions", ignore = true)
    User userRequestDtoToUser(UserRequestDTO user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "transactions", ignore = true)
    void updateUserFromUserRequestDto(UserRequestDTO update, @MappingTarget User user);

    List<UserResponseDTO> userListToUserResponseDto(List<User> users);
}
