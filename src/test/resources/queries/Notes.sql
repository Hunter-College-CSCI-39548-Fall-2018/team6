--- to find missing climate cities
SELECT t.city_name as top, c.city_name as climate FROM Climate c RIGHT JOIN Top_Cities t on c.city_name = t.city_name ORDER BY climate, top;

--- no missing cities from cost_index
SELECT t.city_name as top, c.city_name as cost_indexes FROM Cost_Indexes c RIGHT JOIN Top_Cities t on c.city_name = t.city_name ORDER BY cost_indexes, top;

-- top_cities vs airports
SELECT t.city_name as top, a.city as airports FROM Top_Cities t LEFT JOIN Airports a on t.city_name = a.city ORDER BY airports, top;