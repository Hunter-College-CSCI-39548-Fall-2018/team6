Eunice:
	Need:
		Parameters for survey request
	TODO (for Monday):
		Authorization
		Forgot password (JWT)

Samson:
	Need:
		1. API request/response schemas
	TODO (for Monday):
		1. API endpoint for survey
		2. JSON schema for survey
		3. Spring API skeleton
		4. Data's fully loaded

Adrian:
	Need:
		1. /login
		2. /register
		3. /forgot
	TODO (for Monday):
		1. JWT
		2. Users table
			* username
			* password
				hash server-side
			* email

Navid:
	TODO (for Monday):
		1. Results List

Topgyal:
	React component for when we have API
	TODO (for Monday):
		2. Result
	GET Request:
		Sliders: {
		// out of 10
		Climate: 7
		Cost: 5
	}
	Response:
		Results: [{
		CityName: ,
		StateName: ,
		AveragePrice: , 
	}]

Core workflow:
	* Register
		/register
	1. Login
		/login
		/forget
		front-end: logout -> login page
	2. Survey
		Front-end:
			UI: Eunice
		Back-end:
			/survey
	3. Result List
	3a. Cities
		Back-end: /surveyResult/city_name
	* History
		Table with username / foreign_key survey (5)
		/history/username

Results List:
	1. Sample JSON response
		{[
			Score: (out of 1),
			CityName: "New York City",
			StateName: "New York",
			Weather: [
				high: 80
				low: 40
				],
			Cost: "$" // out of 4 $
			Picture: URL // asset link
			],
		[
			Score: (out of 1),
			CityName: "New York City",
			StateName: "New York",
			Weather: [
				high: 80
				low: 40
				],
			Cost: "$" // out of 4 $
			Picture: URL // asset link
			],
		[
			Score: (out of 1),
			CityName: "New York City",
			StateName: "New York",
			Weather: [
				high: 80
				low: 40
				],
			Cost: "$" // out of 4 $
			Picture: URL // asset link
			],} 

Result:
	1. Sample JSON response
		{
		CityName: "New York City",
		StateName: "New York",
		Weather: [
			high: 80
			low: 40
			],
		Cost: "$",
		// Links
		TopBars: []
		// Links
		TopRestaurants: []
		NearbyAirports: [
			"JFK", "LGA", "" // NEWARK],
		Picture: URL // asset link} 