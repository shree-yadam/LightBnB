INSERT INTO users  (name, email, password)
VALUES ('ABC', 'abc@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('DEF', 'def@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('GHI', 'ghi@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, country, street, city, province, post_code) 
VALUES ('GHI PROPERTY', 'description', 3, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 12, 1, 2, 3, true, 'CANADA', '3 LIGHTHOUSE WAY', 'LABS CITY', 'ON', 'L1B L2B'),
('ABC PROPERTY', 'description', 1, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 12, 1, 2, 3, true, 'CANADA', '1 LIGHTHOUSE WAY', 'LABS CITY', 'ON', 'L1B L2B'),
('DEF PROPERTY', 'description', 2, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 12, 1, 2, 3, true, 'CANADA', '2 LIGHTHOUSE WAY', 'LABS CITY', 'ON', 'L1B L2B');
INSERT INTO reservations (
    id, guest_id, property_id, start_date, end_date)
VALUES (1, 3, 2, '2021-06-23', '2021-06-27'),
(2, 1, 2, '2021-05-21', '2021-06-23'),
(3, 1, 3, '2021-04-3', '2021-04-7');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 2, 1, 4, 'messages'),
(2, 1, 2, 2, 'messages'),
(3, 1, 3, 3, 'messages');