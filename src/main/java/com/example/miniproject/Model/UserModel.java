package com.example.miniproject.Model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserModel {
    private String id;
    @Getter
    @Setter
    private String username;
    @Getter
    @Setter
    private String email;
    private String password;
}

