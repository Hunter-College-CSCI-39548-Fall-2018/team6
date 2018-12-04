CREATE TABLE IF NOT EXISTS I_Climate_High
	AS
	SELECT c.city_name,
	    	@curRank := @curRank + 1 AS rank
	FROM Climate c, (SELECT @curRank := 0) r
	ORDER BY c.low DESC;