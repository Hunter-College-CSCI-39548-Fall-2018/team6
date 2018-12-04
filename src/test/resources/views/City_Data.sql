SELECT
  (SELECT state_name FROM Airport_Codes WHERE city_name = ?) as state_name,
  (SELECT airport_code FROM Airport_Codes ORDER BY airport_code LIMIT 1) AS airport_code,
  (SELECT airport_name FROM Airport_Codes ORDER BY airport_code LIMIT 1) as airport_name,
  (SELECT passengers FROM Airport_Passengers WHERE city_name = ?) as passengers,
  (SELECT pop_2018 FROM City_Populations WHERE city_name = ?) as population,
  (SELECT density_2018 FROM City_Populations WHERE city_name = ?) as density,
  (SELECT high FROM Climate WHERE city_name = ?) as high,
  (SELECT low FROM Climate WHERE city_name = ?) as low,
  (SELECT avg_annual_precipitation from Climate WHERE city_name = ?) as precipitation,
  (SELECT cost_index FROM Cost_Indexes WHERE city_name = ?) as cost_index,
  (SELECT state_code FROM States WHERE state_name = ?) as state_code;