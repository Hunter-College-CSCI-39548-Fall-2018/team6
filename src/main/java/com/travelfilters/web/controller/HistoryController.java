package com.travelfilters.web.controller;

import com.google.gson.Gson;
import com.travelfilters.web.beans.History_Result;
import com.travelfilters.web.connector.SQLConnector;
import com.travelfilters.web.security.CurrentUser;
import com.travelfilters.web.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;

@RestController
@RequestMapping("/v1/history")
public class HistoryController {

    @GetMapping("")
    public ResponseEntity<?> getHistory(@CurrentUser UserPrincipal currentUser) {
        String jsonString = buildHistory(currentUser);

        System.out.println("jsonString = " + jsonString);
        return ResponseEntity.ok().body(jsonString);
    }

    public static String buildHistory(UserPrincipal currentUser) {
        Gson gson = new Gson();
        LinkedList<History_Result> history_results = new LinkedList<>();
        try {
            SQLConnector sqlConnector = new SQLConnector();

            Connection connection = sqlConnector.getConnection();
            ResultSet rs;

            String query = "SELECT * FROM History WHERE userid = ? ORDER BY creation_date DESC;";

            PreparedStatement statement = connection.prepareStatement(query);
            statement.setLong(1, currentUser.getId());

            rs = statement.executeQuery();

            while (rs.next()) {
                History_Result history_result = new History_Result();
                history_result.setClimate(rs.getInt("climate"));
                history_result.setPopulation(rs.getInt("population"));
                history_result.setPrecipitation(rs.getInt("precipitation"));
                history_result.setDensity(rs.getInt("density"));
                history_result.setExpensive(rs.getInt("expensive"));
                history_result.setBusy(rs.getInt("busy"));
                history_result.setStartAirport(rs.getString("startAirport"));
                history_result.setStartDate(rs.getString("startDate"));
                history_result.setEndDate(rs.getString("endDate"));
                history_result.setSearchDate(rs.getString("creation_date"));
                history_results.add(history_result);
            }
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }


        return gson.toJson(history_results);
    }
}
