CREATE TABLE IF NOT EXISTS visits (
  path TEXT NOT NULL,
  day TEXT NOT NULL,
  visitor TEXT NOT NULL,
  PRIMARY KEY (path, day, visitor)
);

CREATE INDEX IF NOT EXISTS idx_visits_day ON visits (day);
