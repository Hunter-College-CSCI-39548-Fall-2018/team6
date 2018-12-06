package com.travelfilters.web.payload;

import javax.validation.constraints.NotBlank;

public class ForgotRequest {
    @NotBlank
    private String email;
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
