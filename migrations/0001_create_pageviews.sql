CREATE TABLE IF NOT EXISTS pageviews (
  path TEXT NOT NULL,
  day TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (path, day)
);

CREATE INDEX IF NOT EXISTS idx_pageviews_path ON pageviews (path);
