import math


def within_radius(lat1: float, lon1: float, lat2: float, lon2: float, radius_meters: float) -> bool:
    """Check if two coordinates are within a given radius (in meters).

    Uses the haversine formula to calculate the great-circle distance
    between two points on the Earth's surface.

    Args:
        lat1: Latitude of point 1 (degrees)
        lon1: Longitude of point 1 (degrees)
        lat2: Latitude of point 2 (degrees)
        lon2: Longitude of point 2 (degrees)
        radius_meters: Maximum allowed distance in meters

    Returns:
        True if the distance is within radius, False otherwise.
    """
    # Earth radius in meters
    R = 6371000

    # Convert decimal degrees to radians
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)

    # Haversine formula
    a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))

    # Calculate distance
    distance = R * c

    return distance <= radius_meters