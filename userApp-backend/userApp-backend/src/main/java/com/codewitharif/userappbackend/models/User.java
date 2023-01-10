package com.codewitharif.userappbackend.models;

import jakarta.validation.constraints.NotNull;
import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String name;
    @NotNull
    @UniqueUsername
    private String username;
    @NotNull
    private String email;
}
