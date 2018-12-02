--- to find missing climate cities
SELECT t.city_name as top, c.city_name as climate FROM Climate c RIGHT JOIN City_Populations t on c.city_name = t.city_name ORDER BY climate, top;

--- no missing cities from cost_index
SELECT t.city_name as top, c.city_name as cost_indexes FROM Cost_Indexes c RIGHT JOIN City_Populations t on c.city_name = t.city_name ORDER BY cost_indexes, top;

-- top_cities vs airports
SELECT t.city_name as top, a.city as airports FROM City_Populations t LEFT JOIN Airports a on t.city_name = a.city ORDER BY airports, top;

-- check to make sure there are airports for every state
SELECT DISTINCT(s.state_name) FROM Airport_Codes a RIGHT OUTER JOIN States s on a.state_name = s.state_name ORDER BY s.state_name ASC;

--- confirming every city has an airport
SELECT a.city_name, a.airport_code, c.city_name FROM Airport_Codes a JOIN City_Populations c on a.city_name = c.city_name ORDER BY c.city_name;

--- to Drop_Tables fare data
SELECT * FROM Fares WHERE origin in ('ABQ','LHD','ANC','MRI','ATL','AUS','BFL','BTR','BOS','BUF','CLT','ORD','MDW','LUK','CLE','COS','CSG','CMH','LCK','DAL','DEN','ELP','FWA','FAT','GSO','HNL','HOU','IAH','IND','OAJ','JAX','MCI','LRD','LAS','LNK','LGB','LAX','SDF','LBB','MSN','MEM','IWA','MIA','MKE','MSP','BNA','MSY','JFK','LGA','EWR','ORF','OAK','OKC','OMA','MCO','PHL','PHX','PIT','PWM','PDX','RDU','RNO','RIC','SMF','SAT','SAN','SFO','SJC','SNA','BFI','GEG','STL','SCK','TPA','TOL','TUS','TUL','ICT') AND dest in ('ABQ','LHD','ANC','MRI','ATL','AUS','BFL','BTR','BOS','BUF','CLT','ORD','MDW','LUK','CLE','COS','CSG','CMH','LCK','DAL','DEN','ELP','FWA','FAT','GSO','HNL','HOU','IAH','IND','OAJ','JAX','MCI','LRD','LAS','LNK','LGB','LAX','SDF','LBB','MSN','MEM','IWA','MIA','MKE','MSP','BNA','MSY','JFK','LGA','EWR','ORF','OAK','OKC','OMA','MCO','PHL','PHX','PIT','PWM','PDX','RDU','RNO','RIC','SMF','SAT','SAN','SFO','SJC','SNA','BFI','GEG','STL','SCK','TPA','TOL','TUS','TUL','ICT');
