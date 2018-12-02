cities = ['ABQ','LHD','ANC','MRI','ATL','AUS','BFL','BTR','BOS','BUF','CLT','ORD','MDW','LUK','CLE','COS','CSG','CMH','LCK','DAL','DEN','ELP','FWA','FAT','GSO','HNL','HOU','IAH','IND','OAJ','JAX','MCI','LRD','LAS','LNK','LGB','LAX','SDF','LBB','MSN','MEM','IWA','MIA','MKE','MSP','BNA','MSY','JFK','LGA','EWR','ORF','OAK','OKC','OMA','MCO','PHL','PHX','PIT','PWM','PDX','RDU','RNO','RIC','SMF','SAT','SAN','SFO','SJC','SNA','BFI','GEG','STL','SCK','TPA','TOL','TUS','TUL','ICT']

def Drop_Tables():
	with open("Fares_Full.csv") as readfile:
		with open("Fares.csv", 'w') as writefile:
			for line in readfile:
				line = line.split(",")
				if line[0] in cities and line[1] in cities:
					writefile.write(line[0] + "," + line[1] + "," + str(round(float(line[2]),2)) + "\n")

Drop_Tables()