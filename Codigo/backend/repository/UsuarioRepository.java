package com.padaria.backend.repository;

import com.padaria.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// JpaRepository já nos dá todos os métodos básicos de CRUD
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método customizado para buscar um usuário pelo username, 
    // essencial para o Login (RF01) e validação de duplicidade (UserManagement.jsx)
    Optional<Usuario> findByUsername(String username);
}