import json

def getTemps(month1, month2, month3):
	high1 = climate[month1]["High"]
	high2 = climate[month2]["High"]
	high3 = climate[month3]["High"]

	low1 = climate[month1]["Low"]
	low2 = climate[month2]["Low"]
	low3 = climate[month3]["Low"]

	avgHigh = (high1 + high2 + high3)/3
	avgLow = (low1 + low2 + low3)/3

	return round((avgHigh + avgLow)/2,1)

the_data = '[{"Month": "Jan", "Low":37, "High":47, "Precipitation": 5.55},{"Month": "Feb", "Low":37, "High":50, "Precipitation": 3.46},{"Month": "Mar", "Low":39, "High":54, "Precipitation": 3.7},{"Month": "Apr", "Low":42, "High":58, "Precipitation": 2.68},{"Month": "May", "Low":47, "High":65, "Precipitation": 1.93},{"Month": "Jun", "Low":52, "High":70, "Precipitation": 1.54},{"Month": "Jul", "Low":56, "High":76, "Precipitation": 0.67},{"Month": "Aug", "Low":56, "High":76, "Precipitation": 0.87},{"Month": "Sep", "Low":52, "High":71, "Precipitation": 1.42},{"Month": "Oct", "Low":46, "High":60, "Precipitation": 3.46},{"Month": "Nov", "Low":40, "High":51, "Precipitation": 6.54},{"Month": "Dec", "Low":36, "High":46, "Precipitation": 5.31}]';		

climate = json.loads(the_data)

q1 = getTemps(0, 1, 2)
q2 = getTemps(3, 4, 5)
q3 = getTemps(6, 7, 8)
q4 = getTemps(9, 10, 11)

print(q1, q2, q3, q4)