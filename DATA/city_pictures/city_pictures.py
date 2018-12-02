import os

print(os.listdir("."))

for x in os.listdir("."):
	print(x.replace(".jpg", ""))