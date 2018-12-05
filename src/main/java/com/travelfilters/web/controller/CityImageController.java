package com.travelfilters.web.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/city-img/{city}")
public class CityImageController {
    @GetMapping("/{city}")
    public ResponseEntity<?> serveCityImage(@PathVariable String city) {
        return ResponseEntity.ok().body("Endpoint hit successfully for city-image for " + city);
    }
}
