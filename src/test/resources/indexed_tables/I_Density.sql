CREATE TABLE IF NOT EXISTS I_Density
	AS
	SELECT c.city_name,
		@curRank := @curRank + 1 AS rank
	FROM City_Populations c, (SELECT @curRank := 0) r
	ORDER BY c.density_2018;