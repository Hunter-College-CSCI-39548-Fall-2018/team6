package com.travelfilters.web.beans;

public class City {
    private String city_name;
    private String state_name;
    private String city_img;
    private Integer population;
    // out of 4
    private Integer cost_index;
    private Float high;
    private Float low;
    // out of 4
    private Integer busy;
    private Float density;
    private Integer score;

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
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

    public String getCity_img() {
        return city_img;
    }

    public void setCity_img(String city_img) {
        this.city_img = city_img;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public Integer getCost_index() {
        return cost_index;
    }

    public void setCost_index(Integer cost_index) {
        this.cost_index = cost_index;
    }

    public Float getHigh() {
        return high;
    }

    public void setHigh(Float high) {
        this.high = high;
    }

    public Float getLow() {
        return low;
    }

    public void setLow(Float low) {
        this.low = low;
    }

    public Integer getBusy() {
        return busy;
    }

    public void setBusy(Integer busy) {
        this.busy = busy;
    }

    public Float getDensity() {
        return density;
    }

    public void setDensity(Float density) {
        this.density = density;
    }
}
