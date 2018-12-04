package com.travelfilters.web.controller;

import com.travelfilters.web.connector.SQLConnector;
import com.travelfilters.web.payload.ApiResponse;
import com.travelfilters.web.payload.SurveyRequest;
import com.travelfilters.web.security.CurrentUser;
import com.travelfilters.web.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/v1/survey")
public class SurveyController {

    @PostMapping("")
    public ResponseEntity<?> submitSurvey(@CurrentUser UserPrincipal currentUser, @RequestBody SurveyRequest surveyRequest) {
        MultiValueMap<String, String> responseMap = calculateResults(surveyRequest);
//        currentUser.getId()
        return ResponseEntity.ok(new ApiResponse(true, "Hit the endpoint successfully"));
    }

    public static MultiValueMap<String, String> calculateResults(SurveyRequest surveyRequest) {
        SQLConnector sqlConnector = new SQLConnector();

        HashMap<String, Integer> Airport_Passengers = getRanks("I_Airport_Passengers");
        HashMap<String, Integer> City_Populations = getRanks("I_City_Populations");
        HashMap<String, Integer> Climate_Precipitation = getRanks("I_Climate_Precipitation");
        HashMap<String, Integer> Climate_Q1 = getRanks("I_Climate_Q1");
        HashMap<String, Integer> Climate_Q2 = getRanks("I_Climate_Q2");
        HashMap<String, Integer> Climate_Q3 = getRanks("I_Climate_Q3");
        HashMap<String, Integer> Climate_Q4 = getRanks("I_Climate_Q4");
        HashMap<String, Integer> Cost_Indexes = getRanks("I_Cost_Indexes");
        HashMap<String, Integer> Density = getRanks("I_Density");

        HashMap<String, Integer> diffMap = new HashMap<>();
        for (String city : getCities()){
//            Integer diff =
//                    Math.abs(Airport_Passengers.get(city) -
//            diffMap.put(city, );
        }
        return null;
    }

    public static HashMap<String, Integer> getRanks(String tableName){
        SQLConnector sqlConnector = new SQLConnector();

        HashMap<String, Integer> rankMap = new HashMap<>();

        try {
            Connection connection = sqlConnector.getConnection();
            Statement statement = connection.createStatement();
            ResultSet tableData = statement.executeQuery("SELECT * FROM " + tableName + " t RIGHT JOIN City_Populations c ON c.city_name = t.city_name");
            while (tableData.next()) {
                rankMap.put(tableData.getString(1), tableData.getInt(2));
            }
            System.out.println(rankMap.toString());
            return rankMap;
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public static ArrayList<String> getCities(){
        SQLConnector sqlConnector = new SQLConnector();

        ArrayList<String> cityList = new ArrayList<>();

        try {
            Connection connection = sqlConnector.getConnection();
            Statement statement = connection.createStatement();
            ResultSet tableData = statement.executeQuery("SELECT city_name FROM City_Populations ORDER BY city_name");
            while (tableData.next()) {
                cityList.add(tableData.getString(1));
            }
            System.out.println(cityList.toString());
            return cityList;
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
