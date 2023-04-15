package com.inn.stadium.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.function.Function;

@Service
public class JwtUtil {

    private String secret = "--bMdai43IMFSDdsklanjhKJhkhJy6";

    public String extractUsername(String token){
        return  extractClamis(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClamis(token,Claims::getExpiration);
    }

    public <T> T extractClamis(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration()
    }
}
