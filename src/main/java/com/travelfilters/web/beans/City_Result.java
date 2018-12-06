package com.travelfilters.web.beans;

import java.util.LinkedList;

public class City_Result {
    private double flight_cost;
    private String city_name;
    private String state_name;
    private String airport_name;
    private String airport_code;
    private String city_img;
    private int population;
    private int density;
    // out of 4
    private int cost_index;
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

    private String startDate;
    private String endDate;
    private String startAirport;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartAirport() {
        return startAirport;
    }

    public void setStartAirport(String startAirport) {
        this.startAirport = startAirport;
    }

    public double getFlight_cost() {
        return flight_cost;
    }

    public void setFlight_cost(double flight_cost) {
        this.flight_cost = flight_cost;
    }

    public String getCity_name() {
        return city_name;
    }

    public void setCity_name(String city_name) {
        this.city_name = city_name;
    }

    public String getState_name() {
        return state_name;
    }

    public void setState_name(String state_name) {
        this.state_name = state_name;
    }

    public String getAirport_name() {
        return airport_name;
    }

    public void setAirport_name(String airport_name) {
        this.airport_name = airport_name;
    }

    public String getAirport_code() {
        return airport_code;
    }

    public void setAirport_code(String airport_code) {
        this.airport_code = airport_code;
    }

    public String getCity_img() {
        return city_img;
    }

    public void setCity_img(String city_img) {
        this.city_img = city_img;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    public int getDensity() {
        return density;
    }

    public void setDensity(int density) {
        this.density = density;
    }

    public int getCost_index() {
        return cost_index;
    }

    public void setCost_index(int cost_index) {
        this.cost_index = cost_index;
    }

    public int getHigh() {
        return high;
    }

    public void setHigh(int high) {
        this.high = high;
    }

    public int getLow() {
        return low;
    }

    public void setLow(int low) {
        this.low = low;
    }

    public int getBusy() {
        return busy;
    }

    public void setBusy(int busy) {
        this.busy = busy;
    }

    public float getAnnual_precipitation() {
        return annual_precipitation;
    }

    public void setAnnual_precipitation(float annual_precipitation) {
        this.annual_precipitation = annual_precipitation;
    }

    public int getAnnual_passengers() {
        return annual_passengers;
    }

    public void setAnnual_passengers(int annual_passengers) {
        this.annual_passengers = annual_passengers;
    }

    public LinkedList<Yelp_Bean> getYelp_tours() {
        return yelp_tours;
    }

    public void setYelp_tours(LinkedList<Yelp_Bean> yelp_tours) {
        this.yelp_tours = yelp_tours;
    }

    public LinkedList<Yelp_Bean> getYelp_bars() {
        return yelp_bars;
    }

    public void setYelp_bars(LinkedList<Yelp_Bean> yelp_bars) {
        this.yelp_bars = yelp_bars;
    }

    public LinkedList<Yelp_Bean> getYelp_restaurants() {
        return yelp_restaurants;
    }

    public void setYelp_restaurants(LinkedList<Yelp_Bean> yelp_restaurants) {
        this.yelp_restaurants = yelp_restaurants;
    }

    public LinkedList<Yelp_Bean> getYelp_landmarks() {
        return yelp_landmarks;
    }

    public void setYelp_landmarks(LinkedList<Yelp_Bean> yelp_landmarks) {
        this.yelp_landmarks = yelp_landmarks;
    }

    public LinkedList<Yelp_Bean> getYelp_hotels() {
        return yelp_hotels;
    }

    public void setYelp_hotels(LinkedList<Yelp_Bean> yelp_hotels) {
        this.yelp_hotels = yelp_hotels;
    }
}
