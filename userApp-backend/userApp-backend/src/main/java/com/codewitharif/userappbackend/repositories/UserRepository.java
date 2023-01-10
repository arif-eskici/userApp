package com.codewitharif.userappbackend.repositories;


import com.codewitharif.userappbackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
