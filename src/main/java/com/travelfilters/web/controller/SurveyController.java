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
import java.util.*;

import static java.util.stream.Collectors.*;
import static java.util.Map.Entry.*;


@RestController
@RequestMapping("/v1/survey")
public class SurveyController {

    @PostMapping("")
    public ResponseEntity<?> submitSurvey(@CurrentUser UserPrincipal currentUser, @RequestBody SurveyRequest surveyRequest) {
        HashMap<String, Integer> resultMap = calculateResults(surveyRequest);

//        currentUser.getId()
        ResponseEntity<String> resp = ResponseEntity.ok()
                .body(buildResponse(resultMap))
                .build();
    }

    public static HashMap<String, Integer> calculateResults(SurveyRequest surveyRequest) {
        // for testing purposes

//        surveyRequest = new SurveyRequest();
//        surveyRequest.setClimate(0);
//        surveyRequest.setExpensive(0);
//        surveyRequest.setPopulation(0);
//        surveyRequest.setPrecipitation(0);
//        surveyRequest.setDensity(0);
//        surveyRequest.setBusy(0);

        HashMap<String, Integer> Airport_Passengers = getRanks("I_Airport_Passengers");
        HashMap<String, Integer> City_Populations = getRanks("I_City_Populations");
        HashMap<String, Integer> Climate_Precipitation = getRanks("I_Climate_Precipitation");
        HashMap<String, Integer> Climate_High = getRanks("I_Climate_High");
//        HashMap<String, Integer> Climate_Low = getRanks("I_Climate_Low");
        HashMap<String, Integer> Cost_Indexes = getRanks("I_Cost_Indexes");
        HashMap<String, Integer> Density = getRanks("I_Density");

        HashMap<String, Integer> diffMap = new HashMap<>();
        Map<String, Integer> sorted = new LinkedHashMap<>();

        for (String city : getCities()) {
//            System.out.println("city = " + city);
            Integer diff =
                        Math.abs(Airport_Passengers.get(city) - surveyRequest.getBusy()) +
                        Math.abs(City_Populations.get(city) - surveyRequest.getPopulation()) +
                        Math.abs(Climate_Precipitation.get(city) - surveyRequest.getPrecipitation()) +
                        Math.abs(Climate_High.get(city) - surveyRequest.getClimate()) +
                        Math.abs(Cost_Indexes.get(city) - surveyRequest.getExpensive()) +
                        Math.abs(Density.get(city) - surveyRequest.getDensity());
                    diffMap.put(city, diff);
            // sort
                    sorted = diffMap
                    .entrySet()
                    .stream()
                    .sorted(comparingByValue())
                    .collect(
                            toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2,
                                    LinkedHashMap::new));

        }
//        System.out.println("diffMap = " + diffMap);
//        System.out.println("sorted = " + sorted);
        Object[] results = sorted.entrySet().toArray();

        HashMap<String, Integer> resultMap = new HashMap<>();

        for (int i = 0; i < 5; i++) {
            String[] result = results[i].toString().split("=");
            resultMap.put(result[0], Integer.valueOf(result[1]));
        }
        return resultMap;
    }

    static HashMap<String, Integer> getRanks(String tableName) {
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
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    static ArrayList<String> getCities() {
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
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    static buildResponse(HashMap<String, Integer> results){
        
    }
}
