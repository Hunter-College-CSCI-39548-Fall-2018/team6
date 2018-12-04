package com.travelfilters.web.beans;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Cities {
    ArrayList<City> Cities = new ArrayList<>();
    public Cities(){ }

    void addCity(City city){
        Cities.add(city);
    }
}
