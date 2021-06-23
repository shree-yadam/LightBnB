INSERT INTO users 
VALUES (1,'ABC', 'abc@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2,'DEF', 'def@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3,'GHI', 'ghi@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (3, 'GHI PROPERTY', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 'CANADA', '3 LIGHTHOUSE WAY', 'LABS CITY', 'ON', 'L1B L2B'),
(1, 'ABC PROPERTY', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 'CANADA', '1 LIGHTHOUSE WAY', 'LABS CITY', 'ON', 'L1B L2B'),
(2, 'DEF PROPERTY', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350 ', 'CANADA', '2 LIGHTHOUSE WAY', 'LABS CITY', 'ON', 'L1B L2B');
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-06-23', '2021-06-27', 2, 3),
('2021-05-21', '2021-06-23', 1, 2),
('2021-04-3', '2021-04-7', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 2, 1, 4, 'messages'),
(2, 1, 2, 2, 'messages'),
(3, 1, 3, 3, 'messages');