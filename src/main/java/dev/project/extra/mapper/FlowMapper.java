package dev.project.extra.mapper;

import dev.project.extra.dto.FlowRequestDTO;
import dev.project.extra.dto.FlowResponseDTO;
import dev.project.extra.model.Flow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FlowMapper {

    FlowResponseDTO flowToFlowResponseDto(Flow flow);
    @Mapping(target = "id", ignore = true)
    Flow flowRequestDtoToFlow(FlowRequestDTO flow);

    @Mapping(target = "id", ignore = true)
    void updateFlowFromFlowRequestDto(FlowRequestDTO update, @MappingTarget Flow flow);

    List<FlowResponseDTO> flowListToFlowResponseDto(List<Flow> flows);
}
