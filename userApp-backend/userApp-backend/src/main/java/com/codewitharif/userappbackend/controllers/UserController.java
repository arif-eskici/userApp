package com.codewitharif.userappbackend.controllers;

import com.codewitharif.userappbackend.exception.ApiError;
import com.codewitharif.userappbackend.models.User;
import com.codewitharif.userappbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/users")
    ResponseEntity<?> createUser(@RequestBody User user) {
        String username = user.getUsername();
        if (username == null || username.isEmpty()) {
            ApiError error = new ApiError(400, "Validation Error", "/users");
            Map<String, String> validationErrors = new HashMap<>();
            validationErrors.put("username", "Username cannot be null");
            error.setValidationErrors(validationErrors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        userService.save(user);
        return ResponseEntity.ok("user saved");
    }

    @GetMapping("/users")
    List<User> getAllUsers () {
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userService.updateUser(newUser, id);
    }

    @DeleteMapping("/users/{id}")
    String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
