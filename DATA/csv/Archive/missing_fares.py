airports = ["SAT","ABQ","ANC","ATL","AUS","BFL","BNA","BOS","BTR","BUF","CLE","CLT","CMH","COS","CSG","DAL","DEN","ELP","EWR","FAT","FWA","GEG","GSO","HNL","HOU","IAH","ICT","IND","JAX","JFK","LAS","LAX","LBB","LCK","LGA","LGB","LNK","LRD","MCI","MCO","MDW","MEM","MIA","MKE","MSN","MSP","MSY","OAJ","OAK","OKC","OMA","ORD","ORF","PDX","PHL","PHX","PIT","PWM","RDU","RIC","RNO","SAN","SCK","SDF","SFO","SJC","SMF","SNA","STL","TOL","TPA","TUL","TUS","BFI","IWA","LHD","LUK","MRI","AWO","BWI","BOI","CHD","CRP","DTW","DFW","LEX","PIE","DCA"]

with open("Fares_Full.csv") as readfile:
	with open("Fares.csv", 'w') as writefile:
		for line in readfile:
			split_line = line.split(",")
			if split_line[0] in airports and split_line[1] in airports:
				writefile.write(line)