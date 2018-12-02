package com.travelfilters.web.payload;

import javax.validation.constraints.*;

public class SurveyRequest {
    @NotBlank
    private String climate;

    @NotBlank
    private String popular;

    @NotBlank
    private String population;

    @NotBlank
    private String precipatation;

    @NotBlank
    private String density;

    @NotBlank
    private String expensive;

    @NotBlank
    private String restaurants;

    @NotBlank
    private String landmarks;

    @NotBlank
    private String tours;

    @NotBlank
    private String startDate;

    @NotBlank
    private String endDate;

    public String getClimate() { return climate; }

    public void setClimate(String climate) { this.climate = climate; }

    public String getPopular() { return popular; }

    public void setPopular(String popular) { this.popular = popular; }

    public String getPopulation() { return population; }

    public void setPopulation(String population) { this.population = population; }

    public String getPrecipatation() { return precipatation; }

    public void setPrecipatation(String precipation) { this.precipatation = precipatation; }

    public String getDensity() { return density; }

    public void setDensity(String density) { this.density = density; }

    public String getExpensive() { return expensive; }

    public void setExpensive(String expensive) { this.expensive = expensive; }

    public String getRestaurants() { return restaurants; }

    public void setRestaurants(String restaurants) { this.restaurants = restaurants; }

    public String getLandmarks() { return landmarks; }

    public void setLandmarks(String landmarks) { this.landmarks = landmarks; }

    public String getTours() { return tours; }

    public void setTours(String tours) { this.tours = tours; }

    public String getStartDate() { return startDate; }

    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }

    public void setEndDate(String endDate) { this.endDate = endDate; }
}
