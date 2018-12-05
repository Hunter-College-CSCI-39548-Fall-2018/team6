package com.travelfilters.web.controller;

import com.google.gson.Gson;
import com.travelfilters.web.beans.City;
import com.travelfilters.web.connector.SQLConnector;
import com.travelfilters.web.payload.SurveyRequest;
import com.travelfilters.web.security.CurrentUser;
import com.travelfilters.web.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static java.util.Map.Entry.comparingByValue;
import static java.util.stream.Collectors.toMap;


@RestController
@RequestMapping("/v1/survey")
public class SurveyController {

    static HashMap<String, Integer> Airport_Passengers, City_Populations, Climate_Precipitation, Climate_High, Climate_Low, Cost_Indexes, Density;

    @PostMapping("")
    public ResponseEntity<?> submitSurvey(@CurrentUser UserPrincipal currentUser, @RequestBody SurveyRequest surveyRequest) {
        saveRequest(currentUser, surveyRequest, surveyRequest.getSave());
        HashMap<String, Integer> resultMap = calculateResults(surveyRequest);
        return ResponseEntity.ok().body(buildResponse(resultMap));
    }

    public static HashMap<String, Integer> calculateResults(SurveyRequest surveyRequest) {

        Airport_Passengers = getRanks("I_Airport_Passengers");
        City_Populations = getRanks("I_City_Populations");
        Climate_Precipitation = getRanks("I_Climate_Precipitation");
        Climate_High = getRanks("I_Climate_High");
        Climate_Low = getRanks("I_Climate_Low");
        Cost_Indexes = getRanks("I_Cost_Indexes");
        Density = getRanks("I_Density");

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

        LinkedHashMap<String, Integer> resultMap = new LinkedHashMap<>();

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

    public static String buildResponse(HashMap<String, Integer> results) {
        SQLConnector connector = new SQLConnector();
        Gson gson = new Gson();

        ArrayList<City> cityArr = new ArrayList<>();

        for (String entry : results.keySet()) {
            try {
                Connection connection = connector.getConnection();
                PreparedStatement pstmt = null;
                ResultSet rs = null;

                String query = "SELECT\n" +
                        "  (SELECT state_name FROM Airport_Codes WHERE city_name = ? LIMIT 1) as state_name,\n" +
                        "  (SELECT passengers FROM Airport_Passengers WHERE city_name = ? LIMIT 1) as passengers,\n" +
                        "  (SELECT pop_2018 FROM City_Populations WHERE city_name = ? LIMIT 1) as population,\n" +
                        "  (SELECT density_2018 FROM City_Populations WHERE city_name = ? LIMIT 1) as density,\n" +
                        "  (SELECT high FROM Climate WHERE city_name = ? LIMIT 1) as high,\n" +
                        "  (SELECT low FROM Climate WHERE city_name = ? LIMIT 1) as low;";

                pstmt = connection.prepareStatement(query);

                for (int i = 1; i <= 6; i++) {
                    pstmt.setString(i, entry);
                }


                rs = pstmt.executeQuery();


                if (rs.next()) {
                    City city = new City();
                    System.out.println("entry = " + entry);
                    city.setCity_name(entry);
                    city.setState_name(capitalize(rs.getString("state_name").toLowerCase()));
                    city.setBusy(Airport_Passengers.get(entry) / 24 + 1);
                    city.setDensity(rs.getFloat("density"));
                    city.setHigh(rs.getFloat("high"));
                    city.setLow(rs.getFloat("low"));
                    city.setPopulation(rs.getInt("population"));
                    city.setCost_index(Cost_Indexes.get(entry) / 24 + 1);
                    city.setScore(results.get(entry));
                    cityArr.add(city);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        System.out.println("cityArr = " + gson.toJson(cityArr));
        return gson.toJson(cityArr);
    }

    static String capitalize(String str) {
        StringBuffer s = new StringBuffer();

        // Declare a character of space
        // To identify that the next character is the starting
        // of a new word
        char ch = ' ';
        for (int i = 0; i < str.length(); i++) {

            // If previous character is space and current
            // character is not space then it shows that
            // current letter is the starting of the word
            if (ch == ' ' && str.charAt(i) != ' ')
                s.append(Character.toUpperCase(str.charAt(i)));
            else
                s.append(str.charAt(i));
            ch = str.charAt(i);
        }

        // Return the string with trimming
        return s.toString().trim();
    }

    public static void saveRequest(UserPrincipal currentUser, SurveyRequest surveyRequest, boolean save) {
        if (save) {
            SQLConnector connector = new SQLConnector();
            try {
                Connection connection = connector.getConnection();
                PreparedStatement pstmt = null;

                String query = "INSERT INTO History (userid, climate, population, precipitation, density, expensive, startAirport, startDate, endDate) VALUES\n" +
                        "\t(?, ?, ?, ?, ?, ?, ?, ?, ?);";

                pstmt = connection.prepareStatement(query);
                pstmt.setInt(1, -1);
//            pstmt.setInt(1, Integer.valueOf(currentUser.toString()));
                pstmt.setInt(2, surveyRequest.getClimate());
                pstmt.setInt(3, surveyRequest.getPopulation());
                pstmt.setInt(4, surveyRequest.getPrecipitation());
                pstmt.setInt(5, surveyRequest.getDensity());
                pstmt.setInt(6, surveyRequest.getExpensive());
                pstmt.setString(7, surveyRequest.getAirport());
                pstmt.setString(8, surveyRequest.getStartDate());
                pstmt.setString(9, surveyRequest.getEndDate());

                pstmt.executeUpdate();
                connection.commit();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
