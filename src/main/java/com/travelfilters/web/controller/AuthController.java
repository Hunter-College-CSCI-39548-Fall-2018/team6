package com.travelfilters.web.controller;

import com.travelfilters.web.connector.MailMail;
import com.travelfilters.web.exception.AppException;
import com.travelfilters.web.exception.ResourceNotFoundException;
import com.travelfilters.web.model.Role;
import com.travelfilters.web.model.RoleName;
import com.travelfilters.web.model.User;
import com.travelfilters.web.payload.*;
import com.travelfilters.web.repository.RoleRepository;
import com.travelfilters.web.repository.UserRepository;
import com.travelfilters.web.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication); //returns token
        return ResponseEntity.ok(new JwtAuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email is already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(registerRequest.getEmail(), registerRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotRequest forgotRequest) {
        if (!userRepository.existsByEmail(forgotRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email does not exist!"),
                    HttpStatus.BAD_REQUEST);
        }

        String email = forgotRequest.getEmail();
        String token = UUID.randomUUID().toString();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        user.setResetToken(token);

        userRepository.save(user);

        ApplicationContext context =
                new ClassPathXmlApplicationContext("SpringMail.xml");

        MailMail mm = (MailMail) context.getBean("mailMail");
        String msg = "Please reset your password at the link found here " + token;
        mm.sendMail("travelapphunter@gmail.com", email, "Forgot Password", msg);


        return ResponseEntity.ok().body(new ApiResponse(true, msg));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        String email = changePasswordRequest.getEmail();
        String password = changePasswordRequest.getPassword();
        String hashedPassword = passwordEncoder.encode(password);
        String token = changePasswordRequest.getResetToken();

        if (!userRepository.existsByEmail(email)) {
            return new ResponseEntity(new ApiResponse(false, "Email does not exist!"), HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("User", "token", token));

        user.setPassword(hashedPassword);

        userRepository.save(user);

        return ResponseEntity.ok().body(new ApiResponse(true, "Password successfully reset!"));
    }
}
