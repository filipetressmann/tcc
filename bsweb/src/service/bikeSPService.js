import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

function buildFiltersPayload(filters) {
  const filterPayload = {};

  if (filters.gender) filterPayload.gender = filters.gender;
  if (filters.race) filterPayload.race = filters.race;
  
  const dateFilters = {}

  if (filters.from) dateFilters.date_from = filters.from;
  if (filters.to) dateFilters.date_to = filters.to;

  if (Object.keys(dateFilters).length > 0) {
    filterPayload.date_filter = dateFilters;
  }

  return filterPayload;
}

function buildFetchTripDataRequest(filters) {
  const payload = {
    aggregation: filters.aggregation,
    data_type: filters.data_type,
  };

  const filterPayload = buildFiltersPayload(filters);

  if (Object.keys(filterPayload).length > 0) {
    payload.filters = filterPayload;
  }

  return payload
}

export async function fetchBikeSPData(filters) {
  const payload = buildFetchTripDataRequest(filters)
  try {
    const response = await axios.post(`${api_url}/bikesp/fetch_trip_data`, payload);
    return response.data.data || [];
  } catch (error) {
    console.error("Error in bikeSPService.fetchBikeSPData:", error);
    throw error;
  }
}

function buildFetchGeographicData(data) {
  const payload = {
    data_type: data.filters.data_type,
    zoom_level: data.zoom_level,
    center: data.map_center,
    max_distance: data.max_distance,
  };

  const filterPayload = buildFiltersPayload(data.filters);

  if (Object.keys(filterPayload).length > 0) {
    payload.filters = filterPayload;
  }

  return payload
}

export async function fetchGeographicBikeSPData(filters) {
  const payload = buildFetchGeographicData(filters)
  try {
    const response = await axios.post(`${api_url}/bikesp/fetch_geographic_data`, payload);
    return response.data.data || [];
  } catch (error) {
    console.error("Error in bikeSPService.fetchGeographicBikeSPData:", error);
    throw error;
  }
}