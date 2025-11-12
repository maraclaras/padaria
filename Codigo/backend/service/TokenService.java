package com.padaria.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.padaria.backend.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    // A chave secreta deve ser forte e armazenada com segurança
    @Value("${api.security.token.secret}")
    private String secret;

    /**
     * Gera um token JWT para o usuário.
     * @param usuario O usuário autenticado.
     * @return O token JWT como String.
     */
    public String gerarToken(Usuario usuario) {
        try {
            // O algoritmo (chave secreta) é usado para assinar o token
            Algorithm algorithm = Algorithm.HMAC256(secret);
            
            String token = JWT.create()
                .withIssuer("padaria-real-api") // Quem emitiu o token
                .withSubject(usuario.getUsername()) // O assunto (username)
                .withExpiresAt(dataExpiracao()) // Data de expiração (2 horas)
                .withClaim("role", usuario.getRole().toString()) // Adiciona o papel (Role) no payload
                .sign(algorithm);
            
            return token;
            
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    /**
     * Valida um token e retorna o username.
     * @param tokenJWT O token a ser validado.
     * @return O username (subject) do token.
     */
    public String getSubject(String tokenJWT) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                .withIssuer("padaria-real-api")
                .build()
                .verify(tokenJWT)
                .getSubject();
        } catch (JWTVerificationException exception){
            // Se o token for inválido ou expirado, lança exceção
            throw new RuntimeException("Token JWT inválido ou expirado!", exception);
        }
    }

    /**
     * Define a data de expiração para o token (Ex: 2 horas após a emissão).
     */
    private Instant dataExpiracao() {
        // Expira em 2 horas (GMT-3 é o fuso horário de São Paulo, ajuste se necessário)
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}