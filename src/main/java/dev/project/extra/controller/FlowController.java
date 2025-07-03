package dev.project.extra.controller;

import dev.project.extra.dto.FlowRequestDTO;
import dev.project.extra.dto.FlowResponseDTO;
import dev.project.extra.service.FlowService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/flows")
public class FlowController {

    private final FlowService flowService;

    public FlowController(FlowService flowService){
        this.flowService = flowService;
    }

    @GetMapping
    public ResponseEntity<List<FlowResponseDTO>> getAllFlows(){
        return new ResponseEntity<>(flowService.getAllFlows(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlowResponseDTO> getFlowById(@PathVariable Long id){
        return new ResponseEntity<>(flowService.getFlowById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FlowResponseDTO> createFlow(@Valid @RequestBody FlowRequestDTO requestDTO){
        FlowResponseDTO created = flowService.createFlow(requestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlowResponseDTO> updateFlow(@PathVariable Long id, @Valid @RequestBody FlowRequestDTO requestDTO){
        return new ResponseEntity<>(flowService.updateFlow(id, requestDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlow(@PathVariable Long id){
        flowService.deleteFlow(id);

        return ResponseEntity.noContent().build();
    }
}
