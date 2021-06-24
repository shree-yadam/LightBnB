const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;
  const queryParams = [email];
  return pool.query(queryString, queryParams)
    .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;
  const queryParams = [id];
  return pool.query(queryString, queryParams)
    .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  ;
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
  const queryParams = [user.name, user.email, user.password];
  return pool.query(queryString, queryParams)
    .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT properties.*, reservations.*, x.average_rating
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    JOIN (SELECT property_id, AVG(rating) as average_rating
      FROM property_reviews
    GROUP BY property_id) x ON x.property_id = properties.id
    WHERE guest_id = $1 AND end_date < now()::date
    ORDER BY start_date
    LIMIT $2;
    `;
  const queryParams = [guest_id, limit];
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  //city
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}
    `;
  }
  //owner
  if (options.owner_id) {
    if (queryString.includes('WHERE')) {
      queryString += 'AND '
    } else {
      queryString += 'WHERE '
    }
    queryParams.push(options.owner_id);
    queryString += `properties.owner_id = $${queryParams.length}
    `;
  }
  //minimum price
  if (options.minimum_price_per_night) {
    if (queryString.includes('WHERE')) {
      queryString += 'AND '
    } else {
      queryString += 'WHERE '
    }
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `properties.cost_per_night >= $${queryParams.length}
    `;
  }

  //max price
  if (options.maximum_price_per_night) {
    if (queryString.includes('WHERE')) {
      queryString += 'AND '
    } else {
      queryString += 'WHERE '
    }
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `properties.cost_per_night <= $${queryParams.length}
    `;
  }

  queryString += `
  GROUP BY properties.id
  `

  // minimum rating
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}
    `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryString = `
  INSERT INTO properties
  (
  `;
  const queryParams = [];
  if (property.owner_id) {
    queryParams.push(property.owner_id);
    queryString += `owner_id, `
  }
  if (property.title) {
    queryParams.push(property.title);
    queryString += `title, `
  }
  if (property.description) {
    queryParams.push(property.description);
    queryString += `description, `
  }
  if (property.thumbnail_photo_url) {
    queryParams.push(property.thumbnail_photo_url);
    queryString += `thumbnail_photo_url, `
  }
  if (property.cover_photo_url) {
    queryParams.push(property.cover_photo_url);
    queryString += `cover_photo_url, `
  }
  if (property.cost_per_night) {
    queryParams.push(property.cost_per_night);
    queryString += `cost_per_night, `
  }
  if (property.street) {
    queryParams.push(property.street);
    queryString += `street, `
  }
  if (property.city) {
    queryParams.push(property.city);
    queryString += `city, `
  }
  if (property.province) {
    queryParams.push(property.province);
    queryString += `province, `
  }
  if (property.post_code) {
    queryParams.push(property.post_code);
    queryString += `post_code, `
  }
  if (property.country) {
    queryParams.push(property.country);
    queryString += `country, `
  }
  if (property.parking_spaces) {
    queryParams.push(property.parking_spaces);
    queryString += `parking_spaces, `
  }
  if (property.number_of_bathrooms) {
    queryParams.push(property.number_of_bathrooms);
    queryString += `number_of_bathrooms, `
  }
  if (property.number_of_bedrooms) {
    queryParams.push(property.number_of_bedrooms);
    queryString += `number_of_bedrooms, `
  }

  queryString = queryString.substr(0, queryString.length - 2);
  queryString += `) 
  VALUES (
  `;
  for (let i = 1; i <= queryParams.length; i++) {
    queryString += `$${i} ,`;
  }
  queryString = queryString.substr(0, queryString.length - 2);
  queryString += `)
  RETURNING *;`;
  return pool.query(queryString, queryParams)
    .then(res => res.rows[0]);
}
exports.addProperty = addProperty;
