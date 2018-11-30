CREATE TABLE IF NOT EXISTS Top_Cities (
    rank int,
    city_name VARCHAR(40),
    state VARCHAR(40),
    pop_2018 BIGINT,
    pop_2016 BIGINT,
    pop_2010 BIGINT,
    pop_change float,
    density_2018 float
  );