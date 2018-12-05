package com.travelfilters.web.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/city")
public class CityController {
    @GetMapping(value = "/{city_name}")
    public static @ResponseBody void getCity(@PathVariable String city_name){
    


    }
}
