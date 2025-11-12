package com.padaria.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private String username;
    private String role;
}