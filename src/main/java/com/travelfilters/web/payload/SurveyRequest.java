package com.travelfilters.web.payload;

import javax.validation.constraints.*;

public class SurveyRequest {
    @NotBlank
    private String airport;

    @NotBlank
    private Integer climate;

    @NotBlank
    private Integer population;

    @NotBlank
    private Integer precipitation;

    @NotBlank
    private Integer density;

    @NotBlank
    private Integer expensive;

    @NotBlank
    private String startDate;

    @NotBlank
    private String endDate;

    public String getAirport() { return airport; }

    public void setAirport(String airport) { this.airport = airport; }

    public Integer getClimate() { return climate; }

    public void setClimate(Integer climate) { this.climate = climate; }

    public Integer getPopulation() { return population; }

    public void setPopulation(Integer population) { this.population = population; }

    public Integer getPrecipitation() { return precipitation; }

    public void setPrecipitation(Integer precipitation) { this.precipitation = precipitation; }

    public Integer getDensity() { return density; }

    public void setDensity(Integer density) { this.density = density; }

    public Integer getExpensive() { return expensive; }

    public void setExpensive(Integer expensive) { this.expensive = expensive; }

    public String getStartDate() { return startDate; }

    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }

    public void setEndDate(String endDate) { this.endDate = endDate; }
}
