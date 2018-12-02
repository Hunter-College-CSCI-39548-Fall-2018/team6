CREATE TABLE IF NOT EXISTS I_Cost_Indexes
	AS
	SELECT c.city_name,
	    	@curRank := @curRank + 1 AS rank
	FROM Cost_Indexes c, (SELECT @curRank := 0) r
	ORDER BY c.cost_index DESC;