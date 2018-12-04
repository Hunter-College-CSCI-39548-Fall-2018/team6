CREATE TABLE IF NOT EXISTS History (
  userid int,
  climate int,
  population int,
  precipitation int,
  density int,
  expensive int,
  startAirport varchar(3),
  startDate varchar(10),
  endDate varchar(10),
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);