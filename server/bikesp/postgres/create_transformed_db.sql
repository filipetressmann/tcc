CREATE SCHEMA IF NOT EXISTS bikesp_transformed AUTHORIZATION postgres;

CREATE EXTENSION IF NOT EXISTS postgis;

-- This is required so new objects are implicitly created in 'bikesp_transformed'.
ALTER ROLE postgres SET search_path TO bikesp_transformed, "$user", public;