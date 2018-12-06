# travel-filters

#### Our application is designed to make choosing a travel destination more intuitive, by using more intuitive criteria like temperature, precipitation cost, population density, and population.
#### After a successful request, the user is presented with relevant data about their travel destinations, and also has the option to go back to previous searches.

Group Members
====
* Samson Fung
* Adrian Struszczyk
* Eunice Hew

### Project for Hunter CSCI-39548 hosted on DigitalOcean droplet

#### Frontend: React
#### Database: MySQL 
#### Backend: Spring 
#### Authentication: JWT
##### Some data sourced from Yelp API

# Frontend Routes:
/login - Login Page

/history - History Page

/survey - Survey

/changelastpassword - Change password page

# API Endpoints:
### /survey
* Sample Request:
```
{
      "climate": 80,
      "population": 60,
      "precipitation": 30,
      "density": 50,
      "expensive": 40,
      "startAirport": "JFK",
      "startDate": "05-21-2018",
      "endDate": "09-30-2018",
      "busy": 20
  }
```
* Sample Response:
```
[
    {
        "city_name": "Baltimore",
        "state_name": "Maryland",
        "city_img": "https://i.ibb.co/RzFPGGY/baltimore.jpg",
        "population": 601188,
        "cost_index": 2,
        "high": 76.5,
        "low": 32.3,
        "busy": 1,
        "density": 2867.6672,
        "score": 69
    },
    {
        "city_name": "Cleveland",
        "state_name": "Ohio",
        "city_img": "https://i.ibb.co/hKMsVWg/cleveland.jpg",
        "population": 381803,
        "cost_index": 3,
        "high": 71.9,
        "low": 25.7,
        "busy": 2,
        "density": 1897.2448,
        "score": 80
    },
    {
        "city_name": "St. Louis",
        "state_name": "Missouri",
        "city_img": "https://i.ibb.co/dkS4C4q/st-louis.jpg",
        "population": 304462,
        "cost_index": 3,
        "high": 80.2,
        "low": 29.6,
        "busy": 2,
        "density": 1897.398,
        "score": 85
    },
    {
        "city_name": "Atlanta",
        "state_name": "Georgia",
        "city_img": "https://i.ibb.co/0DmKLnN/atlanta.jpg",
        "population": 491626,
        "cost_index": 2,
        "high": 80,
        "low": 42.7,
        "busy": 1,
        "density": 1422.5653,
        "score": 86
    },
    {
        "city_name": "Columbus",
        "state_name": "Ohio",
        "city_img": "https://i.ibb.co/M89FgQv/columbus.jpg",
        "population": 880182,
        "cost_index": 3,
        "high": 75.1,
        "low": 28.3,
        "busy": 2,
        "density": 1554.6047,
        "score": 89
    }
]
```
### /history
* Sample Request:
```
[
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-05 23:31:50",
        "busy": 0
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:16",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:18",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:18",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:39",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:39",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:39",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:40",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:16:40",
        "busy": 4
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:26:23",
        "busy": 0
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:27:43",
        "busy": 0
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:28:47",
        "busy": 0
    },
    {
        "climate": 0,
        "population": 0,
        "precipitation": 0,
        "density": 0,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 00:29:43",
        "busy": 0
    },
    {
        "climate": 0,
        "population": 60,
        "precipitation": 0,
        "density": 50,
        "expensive": 0,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 01:11:11",
        "busy": 50
    },
    {
        "climate": 80,
        "population": 60,
        "precipitation": 0,
        "density": 50,
        "expensive": 40,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "08-30-2018",
        "searchDate": "2018-12-06 01:11:55",
        "busy": 50
    },
    {
        "climate": 80,
        "population": 60,
        "precipitation": 30,
        "density": 50,
        "expensive": 40,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "09-30-2018",
        "searchDate": "2018-12-06 01:12:05",
        "busy": 20
    },
    {
        "climate": 80,
        "population": 60,
        "precipitation": 30,
        "density": 50,
        "expensive": 40,
        "startAirport": "JFK",
        "startDate": "05-21-2018",
        "endDate": "09-30-2018",
        "searchDate": "2018-12-06 01:13:34",
        "busy": 20
    }
]
```

### /city/{city_name}
```
{
    "flight_cost": 347.62,
    "state_name": "California",
    "airport_name": "John Wayne Airport",
    "airport_code": "SNA",
    "city_img": "https://i.ibb.co/WFBFFZn/anaheim.jpg",
    "density": 2742,
    "cost_index": 4,
    "high": 77,
    "low": 59,
    "busy": 3,
    "annual_precipitation": 13,
    "annual_passengers": 35460,
    "yelp_tours": [
        {
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/s_9JDNItsY0vArKMewcP9w/o.jpg",
            "page_url": "https://www.yelp.com/biz/newport-landing-whale-watching-and-sportfishing-newport-beach?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 775,
            "review_score": 3,
            "name": "Newport Landing Whale Watching and Sportfishing"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/rBZCdUzq5Qc-auioEz1xRQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/oak-mountain-winery-temecula?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 531,
            "review_score": 4,
            "name": "Oak Mountain Winery"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/deT90KW5J3H2SgJLEXMUXQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/star-tours-anaheim?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 405,
            "review_score": 4.5,
            "name": "Star Tours"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/m5R9jD9V__hpdxMZ8bwsRg/o.jpg",
            "page_url": "https://www.yelp.com/biz/harbor-breeze-cruises-long-beach?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 354,
            "review_score": 4.5,
            "name": "Harbor Breeze Cruises"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/2CyxcloHwtC9RVo-9w11Dw/o.jpg",
            "page_url": "https://www.yelp.com/biz/captain-daves-dolphin-and-whale-watching-safari-dana-point?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 317,
            "review_score": 4.5,
            "name": "Captain Dave's Dolphin & Whale Watching Safari"
        }
    ],
    "yelp_bars": [
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/63AaUC2VZ3I7P-MuZtD_sw/o.jpg",
            "page_url": "https://www.yelp.com/biz/slaters-50-50-anaheim-hills-anaheim-4?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 3612,
            "review_score": 4,
            "name": "Slater's 50/50 - Anaheim Hills"
        },
        {
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/D4w_5GkYajhaEVYW0bDJfA/o.jpg",
            "page_url": "https://www.yelp.com/biz/habana-costa-mesa?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 3469,
            "review_score": 4,
            "name": "Habana"
        },
        {
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/oVNl2sRlPFR33WA6zrPvBQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/slaters-50-50-huntington-beach-huntington-beach?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 3195,
            "review_score": 4,
            "name": "Slater's 50/50 - Huntington Beach"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/ik-WtpZ3Ia-JEd4RNBl1Cg/o.jpg",
            "page_url": "https://www.yelp.com/biz/playground-santa-ana-3?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 2876,
            "review_score": 4.5,
            "name": "Playground"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/aanVUnWu9pXoxVVHANZsFA/o.jpg",
            "page_url": "https://www.yelp.com/biz/bosscat-kitchen-and-libations-newport-beach-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 2813,
            "review_score": 4.5,
            "name": "Bosscat Kitchen and Libations"
        }
    ],
    "yelp_restaurants": [
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/zypqTvP_aCcZ55z1MS7KMA/o.jpg",
            "page_url": "https://www.yelp.com/biz/gen-korean-bbq-house-cerritos?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 4778,
            "review_score": 4.5,
            "name": "Gen Korean BBQ House"
        },
        {
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/J_Z_rqJ5j2GGbcaBcJCGWQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/cream-pan-tustin?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 4291,
            "review_score": 4.5,
            "name": "Cream Pan"
        },
        {
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/aTYqPKBqffnEl8ZspowImA/o.jpg",
            "page_url": "https://www.yelp.com/biz/bruxie-orange-3?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 3951,
            "review_score": 4,
            "name": "Bruxie"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/rzhKYyxhYM-pAkpHMPNszQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/gen-korean-bbq-house-tustin?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 3927,
            "review_score": 4,
            "name": "Gen Korean BBQ House"
        },
        {
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ad3D__oNTzH3g7uM7CXX8Q/o.jpg",
            "page_url": "https://www.yelp.com/biz/din-tai-fung-costa-mesa?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 3744,
            "review_score": 4,
            "name": "Din Tai Fung"
        }
    ],
    "yelp_landmarks": [
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/QIlMhpw2eYJwC13NV4QZ3w/o.jpg",
            "page_url": "https://www.yelp.com/biz/anaheim-packing-district-anaheim?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 2087,
            "review_score": 4,
            "name": "Anaheim Packing District"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/qqlP1QwImXZZimrn6nCFRg/o.jpg",
            "page_url": "https://www.yelp.com/biz/chino-hills-state-park-chino-hills-4?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 69,
            "review_score": 4,
            "name": "Chino Hills State Park"
        },
        {
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/OA1q6pxlY2szfGsp4-sr5A/o.jpg",
            "page_url": "https://www.yelp.com/biz/rancho-los-alamitos-long-beach?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 67,
            "review_score": 4.5,
            "name": "Rancho Los Alamitos"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/I8HG9QTTusuP5XaYHX8SiQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/the-orange-circle-orange-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 45,
            "review_score": 4.5,
            "name": "The Orange Circle"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/34zjgnYiRbNa_CDEXGf_Hw/o.jpg",
            "page_url": "https://www.yelp.com/biz/xcelerator-buena-park-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 20,
            "review_score": 4.5,
            "name": "Xcelerator"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/QIlMhpw2eYJwC13NV4QZ3w/o.jpg",
            "page_url": "https://www.yelp.com/biz/anaheim-packing-district-anaheim?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 2087,
            "review_score": 4,
            "name": "Anaheim Packing District"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/qqlP1QwImXZZimrn6nCFRg/o.jpg",
            "page_url": "https://www.yelp.com/biz/chino-hills-state-park-chino-hills-4?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 69,
            "review_score": 4,
            "name": "Chino Hills State Park"
        },
        {
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/OA1q6pxlY2szfGsp4-sr5A/o.jpg",
            "page_url": "https://www.yelp.com/biz/rancho-los-alamitos-long-beach?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 67,
            "review_score": 4.5,
            "name": "Rancho Los Alamitos"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/I8HG9QTTusuP5XaYHX8SiQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/the-orange-circle-orange-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 45,
            "review_score": 4.5,
            "name": "The Orange Circle"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/34zjgnYiRbNa_CDEXGf_Hw/o.jpg",
            "page_url": "https://www.yelp.com/biz/xcelerator-buena-park-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 20,
            "review_score": 4.5,
            "name": "Xcelerator"
        }
    ],
    "yelp_hotels": [
        {
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/4VmBzWIo7BwdiyE4d9l6YA/o.jpg",
            "page_url": "https://www.yelp.com/biz/hilton-anaheim-hotel-anaheim-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 1243,
            "review_score": 3,
            "name": "Hilton Anaheim Hotel"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/P2Hd0njUvHBAgEMprOFirQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/disneys-grand-californian-hotel-and-spa-anaheim-2?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 1143,
            "review_score": 3.5,
            "name": "Disney's Grand Californian Hotel & Spa"
        },
        {
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/FhZjnLbYn-RITcwVbOKX8g/o.jpg",
            "page_url": "https://www.yelp.com/biz/disneyland-hotel-anaheim?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 852,
            "review_score": 3.5,
            "name": "Disneyland Hotel"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/QCi5K-nlnM6aBJ1iKYBCFQ/o.jpg",
            "page_url": "https://www.yelp.com/biz/hyatt-regency-orange-county-garden-grove?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 677,
            "review_score": 3.5,
            "name": "Hyatt Regency Orange County"
        },
        {
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/6ZBh4eHBpwMWmoF07_g90w/o.jpg",
            "page_url": "https://www.yelp.com/biz/anaheim-marriott-anaheim?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            "review_count": 673,
            "review_score": 3.5,
            "name": "Anaheim Marriott"
        }
    ],
    "startDate": "05-21-2018",
    "endDate": "09-30-2018",
    "startAirport": "JFK"
}
```