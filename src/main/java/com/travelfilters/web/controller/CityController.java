package com.travelfilters.web.controller;

import com.google.gson.Gson;
import com.travelfilters.web.beans.City_Result;
import com.travelfilters.web.beans.Yelp_Bean;
import com.travelfilters.web.connector.SQLConnector;
import com.travelfilters.web.security.CurrentUser;
import com.travelfilters.web.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;

@RestController
@RequestMapping("/v1/city")
public class CityController {
    @GetMapping("/{city_name}")
    public @ResponseBody
    ResponseEntity<String> getCityResponse(@CurrentUser UserPrincipal currentUser, @PathVariable String city_name) {
        Gson gson = new Gson();
//        System.out.println("city_name = " + city_name);
        return ResponseEntity.ok().body(gson.toJson(getCityData(currentUser.getId(), city_name)));
    }

    City_Result getCityData(Long userId, String city_name) {
        City_Result cr = new City_Result();

        addSessionData(cr, userId);
        cr.setYelp_restaurants(getYelpData("Yelp_Restaurants", city_name));
        cr.setYelp_tours(getYelpData("Yelp_Tours", city_name));
        cr.setYelp_bars(getYelpData("Yelp_Bars", city_name));
        cr.setYelp_hotels(getYelpData("Yelp_Hotels", city_name));
        cr.setYelp_landmarks(getYelpData("Yelp_Landmarks", city_name));

        setRemainingData(cr, city_name);

        return cr;
    }

    void addSessionData(City_Result city_result, Long userId){
        try {
            SQLConnector sqlConnector = new SQLConnector();

            Connection connection = sqlConnector.getConnection();
            ResultSet rs;

            String query = "SELECT * FROM Session WHERE userid = ?";
            System.out.println("userId = " + userId);

            PreparedStatement statement = connection.prepareStatement(query);
            statement.setLong(1, userId);

            rs = statement.executeQuery();

            while (rs.next()) {
              city_result.setStartAirport(rs.getString("start_airport"));
              city_result.setStartDate(rs.getString("start_date"));
              city_result.setEndDate(rs.getString("end_date"));
            }
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    LinkedList<Yelp_Bean> getYelpData(String yelp_table, String city_name){
        LinkedList<Yelp_Bean> yelpList = new LinkedList<>();
        try {
            SQLConnector sqlConnector = new SQLConnector();

            Connection connection = sqlConnector.getConnection();
            ResultSet rs;

            String query = "SELECT * FROM {table} WHERE city_name = {city_name}";
            query = query.replace("{table}", yelp_table);
            query = query.replace("{city_name}", '"' + city_name + '"');

            PreparedStatement statement = connection.prepareStatement(query);

            rs = statement.executeQuery();

            while (rs.next()) {
                Yelp_Bean yelp_bean = new Yelp_Bean();
                yelp_bean.setImage_url(rs.getString("image_url"));
                yelp_bean.setName(rs.getString("name"));
                yelp_bean.setPage_url(rs.getString("page_url"));
                yelp_bean.setReview_count(rs.getInt("review_count"));
                yelp_bean.setReview_score(rs.getFloat("review_score"));
                yelpList.add(yelp_bean);
            }
            connection.close();
            return yelpList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    void setRemainingData(City_Result city_result, String city_name){
        try {
            SQLConnector sqlConnector = new SQLConnector();

            Connection connection = sqlConnector.getConnection();
            ResultSet rs;

            String query = "SELECT\n" +
                    "(SELECT state_name FROM Airport_Codes WHERE city_name = {city_name} LIMIT 1) as state_name,\n" +
//                    "--- out of 4\n" +
                    "(SELECT passengers FROM Airport_Passengers WHERE city_name = {city_name} LIMIT 1) as passengers,\n" +
                    "(SELECT rank FROM I_Airport_Passengers WHERE city_name = {city_name} LIMIT 1) as busy,\n" +
                    "(SELECT pop_2018 FROM City_Populations WHERE city_name = {city_name} LIMIT 1) as population,\n" +
//                    "--- use for busy as well\n" +
                    "(SELECT density_2018 FROM City_Populations WHERE city_name = {city_name} LIMIT 1) as density,\n" +
                    "(SELECT high FROM Climate WHERE city_name = {city_name} LIMIT 1) as high,\n" +
                    "(SELECT low FROM Climate WHERE city_name = {city_name} LIMIT 1) as low,\n" +
//                    "--- airport_name\n" +
                    "(SELECT airport_name FROM Airport_Codes WHERE city_name = {city_name} LIMIT 1) as airport_name,\n" +
//                    "--- airport_code\n" +
                    "(SELECT airport_code FROM Airport_Codes WHERE city_name = {city_name} LIMIT 1) as airport_code,\n" +
//                    "--- flight_cost\n" +
                    "(SELECT market_Fare FROM Fares WHERE origin = {origin} and dest = airport_code) as flight_cost,\n" +
//                    "--- annual precipitation\n" +
                    "(SELECT avg_annual_precipitation from Climate WHERE city_name = {city_name} LIMIT 1) as annual_precipitation,\n" +
//                    "--- cost index (out of 4)\n" +
                    "(SELECT rank FROM I_Cost_Indexes WHERE city_name = {city_name} LIMIT 1) as cost_index,\n" +
                    "(SELECT image_link FROM City_Images WHERE city_name = {city_name} LIMIT 1) as city_image\n" +
                    ";";

            query = query.replace("{city_name}", '"' + city_name + '"');
            query = query.replace("{origin}", '"' + city_result.getStartAirport() + '"');

            PreparedStatement statement = connection.prepareStatement(query);

            rs = statement.executeQuery();

            while (rs.next()) {
                city_result.setState_name(rs.getString("state_name"));
                city_result.setAnnual_passengers(rs.getInt("passengers"));
                city_result.setDensity(rs.getInt("density"));
                city_result.setHigh(rs.getInt("high"));
                city_result.setLow(rs.getInt("low"));
                city_result.setAirport_code(rs.getString("airport_code"));
                city_result.setAirport_name(rs.getString("airport_name"));

                double costdouble = rs.getFloat("flight_cost");
                costdouble = Math.round(costdouble * 100.0) / 100.0;

                city_result.setFlight_cost(costdouble);
                city_result.setAnnual_precipitation(rs.getFloat("annual_precipitation"));
                city_result.setCost_index(rs.getInt("cost_index") / 24 + 1);
                city_result.setBusy(rs.getInt("busy") / 24 + 1);
                city_result.setCity_img(rs.getString("city_image"));
            }
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
