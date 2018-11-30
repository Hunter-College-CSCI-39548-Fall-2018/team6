package com.travelfilters.web.controller;

import com.travelfilters.web.payload.ApiResponse;
import com.travelfilters.web.payload.SurveyRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/survey")
public class SurveyController {

    @PostMapping("/")
    public ResponseEntity<?> submitSurvey(@RequestBody SurveyRequest surveyRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Hit the endpoint successfully"));
    }

}