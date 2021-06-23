SELECT properties.*, reservations.*, x.average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN (SELECT property_id, AVG(rating) as average_rating
    FROM property_reviews
    GROUP BY property_id) x ON x.property_id = properties.id
  WHERE guest_id = 1 AND end_date < now()::date
  ORDER BY start_date
  LIMIT 10;
