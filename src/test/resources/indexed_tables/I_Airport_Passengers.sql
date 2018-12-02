CREATE TABLE IF NOT EXISTS I_Airport_Passengers 
	AS 
	SELECT a.city_name,
	    	@curRank := @curRank + 1 AS rank
	FROM Airport_Passengers a, (SELECT @curRank := 0) r
	ORDER BY a.passengers DESC;