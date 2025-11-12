package com.padaria.backend.model;

import com.padaria.backend.model.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity 
@Table(name = "USUARIOS")
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
// O Spring Security exige que a Entidade de Usuário implemente UserDetails
public class Usuario implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(unique = true, nullable = false, length = 100)
    private String username; 

    @Column(nullable = false)
    private String password; 

    @Column(nullable = false)
    private Boolean isActive = true; 

    // Mapeamento do Enum Role
    @Enumerated(EnumType.STRING)
    private Role role; 

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // Usa o campo 'isActive' (do seu Diagrama Lógico) para determinar se o usuário está ativo
    @Override
    public boolean isEnabled() {
        return this.isActive;
    }
}