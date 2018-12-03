package com.travelfilters.web.controller;

import com.travelfilters.web.connector.SQLConnector;
import com.travelfilters.web.payload.ApiResponse;
import com.travelfilters.web.payload.SurveyRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;

@RestController
@RequestMapping("/v1/survey")
public class SurveyController {

    @PostMapping("/")
    public ResponseEntity<?> submitSurvey(@RequestBody SurveyRequest surveyRequest) {
        MultiValueMap<String, String> responseMap = calculateResults(surveyRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Hit the endpoint successfully"));
    }

    public MultiValueMap<String, String> calculateResults(SurveyRequest surveyRequest) {
        SQLConnector sqlConnector = new SQLConnector();
        ResultSet population = sqlConnector.executeSql("SELECT * FROM Climate ORDER BY Climate.city_name");
        return null;
    }
}
