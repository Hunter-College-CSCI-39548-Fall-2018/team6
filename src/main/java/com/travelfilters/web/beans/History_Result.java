package com.travelfilters.web.beans;

public class History_Result {
    private int climate;
    private int population;
    private int precipitation;
    private int density;
    private int expensive;
    private String startAirport;
    private String startDate;
    private String endDate;
    private String searchDate;

    public int getClimate() {
        return climate;
    }

    public void setClimate(int climate) {
        this.climate = climate;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    public int getPrecipitation() {
        return precipitation;
    }

    public void setPrecipitation(int precipitation) {
        this.precipitation = precipitation;
    }

    public int getDensity() {
        return density;
    }

    public void setDensity(int density) {
        this.density = density;
    }

    public int getExpensive() {
        return expensive;
    }

    public void setExpensive(int expensive) {
        this.expensive = expensive;
    }

    public String getStartAirport() {
        return startAirport;
    }

    public void setStartAirport(String startAirport) {
        this.startAirport = startAirport;
    }

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

    public String getSearchDate() { return searchDate;}

    public void setSearchDate(String searchDate){
        this.searchDate = searchDate;
    }
}
