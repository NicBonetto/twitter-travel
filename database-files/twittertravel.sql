DROP TABLE IF EXISTS twittertravel;

CREATE TABLE twittertravel (
  id            serial,
  location_name text,
  image         text,
  search_count  int
);
