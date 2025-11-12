package com.padaria.backend.dto;

import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String username;
    private String password;
    private Boolean isActive; 
    
    
}