package dev.project.extra.service;

import dev.project.extra.dto.FlowRequestDTO;
import dev.project.extra.dto.FlowResponseDTO;
import dev.project.extra.exception.DuplicateFlowException;
import dev.project.extra.exception.ResourceNotFoundException;
import dev.project.extra.mapper.FlowMapper;
import dev.project.extra.model.Flow;
import dev.project.extra.repository.FlowRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FlowService {

    private final FlowRepository flowRepository;
    private final FlowMapper flowMapper;

    public FlowService(FlowRepository flowRepository, FlowMapper flowMapper){
        this.flowRepository = flowRepository;
        this.flowMapper = flowMapper;
    }

    @Transactional(readOnly = true)
    public List<FlowResponseDTO> getAllFlows(){
        return flowRepository.findAll()
                .stream()
                .map(flowMapper::flowToFlowResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public FlowResponseDTO getFlowById(Long id){
        Flow flow = flowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flow cannot be found with id " + id));

        return flowMapper.flowToFlowResponseDto(flow);
    }

    @Transactional
    public FlowResponseDTO createFlow(FlowRequestDTO requestDTO){
        if(flowRepository.existsByName(requestDTO.name())){
            throw new DuplicateFlowException("Flow already exists.");
        }

        Flow flow = flowMapper.flowRequestDtoToFlow(requestDTO);

        return flowMapper.flowToFlowResponseDto(flowRepository.save(flow));
    }

    @Transactional
    public FlowResponseDTO updateFlow(Long id, FlowRequestDTO request){
        Flow existing = flowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flow not found with id " + id));

        flowMapper.updateFlowFromFlowRequestDto(request, existing);

        return flowMapper.flowToFlowResponseDto(flowRepository.save(existing));
    }

    @Transactional
    public void deleteFlow(Long id){
        Flow flow = flowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flow not found with id " + id));

        flowRepository.delete(flow);
    }
}
