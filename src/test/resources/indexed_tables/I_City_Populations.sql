CREATE TABLE IF NOT EXISTS I_City_Populations
	AS
	SELECT c.city_name,
		@curRank := @curRank + 1 AS rank
	FROM City_Populations c, (SELECT @curRank := 0) r
	ORDER BY c.pop_2018;