package com.travelfilters.web.beans;

import java.util.LinkedHashMap;
import java.util.LinkedList;

public class City_Result {
    private float flight_cost;
    private String city_name;
    private String state_name;
    private String airport_name;
    private String airport_code;
    private String city_img;
    private String population;
    private int density;
    private String cost_index;
    private int high;
    private int low;
    // out of 4
    private int busy;
    private float annual_precipitation;
    private int annual_passengers;
    private LinkedList<Yelp_Bean> yelp_tours;
    private LinkedList<Yelp_Bean> yelp_bars;
    private LinkedList<Yelp_Bean> yelp_restaurants;
    private LinkedList<Yelp_Bean> yelp_landmarks;
    private LinkedList<Yelp_Bean> yelp_hotels;
}
