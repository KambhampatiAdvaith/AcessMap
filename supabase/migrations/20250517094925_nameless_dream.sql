/*
  # Add Hyderabad locations data

  1. New Data
    - Adds initial set of wheelchair-accessible locations in Hyderabad
    - Includes parks, restaurants, hospitals, public places, and offices
    - Each location includes basic accessibility information

  2. Categories covered:
    - Parks
    - Restaurants
    - Hospitals
    - Public Places
    - Office Buildings
*/

-- Parks
INSERT INTO locations (name, description, address, lat, lng, category, ratings, review_count)
VALUES
  ('Lumbini Park', 'Wheelchair-accessible park with paved pathways and ramps', 'Tank Bund Road, Hyderabad', 17.4062, 78.4691, 'park', 4.2, 15),
  ('Shilparamam', 'Cultural center with accessible walkways and facilities', 'Hi Tech City Road, Madhapur', 17.4537, 78.3825, 'park', 4.0, 12),
  ('NTR Gardens', 'Accessible garden with smooth paths and rest areas', 'NTR Marg, Hyderabad', 17.4079, 78.4692, 'park', 4.3, 18),
  ('KBR National Park', 'Nature park with accessible walking track', 'Road No 2, Banjara Hills', 17.4169, 78.4149, 'park', 4.1, 20),
  ('Sanjeevaiah Park', 'Wheelchair-friendly park with accessible amenities', 'Necklace Road, Hyderabad', 17.4235, 78.4671, 'park', 4.0, 14);

-- Restaurants
INSERT INTO locations (name, description, address, lat, lng, category, ratings, review_count)
VALUES
  ('24/7 Gallery Café', 'Accessible restaurant with ramps and spacious seating', 'Hyatt Place, Banjara Hills', 17.4156, 78.4358, 'restaurant', 4.4, 25),
  ('Barbeque Nation', 'Wheelchair-accessible with dedicated parking', 'Road No. 1, Banjara Hills', 17.4134, 78.4375, 'restaurant', 4.5, 32),
  ('Absolute Barbecues', 'Fully accessible dining area with wide aisles', 'Road No. 36, Jubilee Hills', 17.4312, 78.4075, 'restaurant', 4.6, 28),
  ('Platform 65', 'Level entry and accessible restrooms', 'Kondapur Main Road', 17.4579, 78.3718, 'restaurant', 4.3, 22),
  ('Flechazo', 'Wheelchair-friendly restaurant with elevator access', 'Gachibowli', 17.4400, 78.3489, 'restaurant', 4.2, 19);

-- Hospitals
INSERT INTO locations (name, description, address, lat, lng, category, ratings, review_count)
VALUES
  ('Apollo Hospitals', 'Fully accessible medical facility with ramps and elevators', 'Jubilee Hills', 17.4239, 78.4075, 'healthcare', 4.7, 45),
  ('KIMS Hospitals', 'Wheelchair-accessible hospital with modern facilities', 'Secunderabad', 17.4400, 78.4990, 'healthcare', 4.8, 38),
  ('Care Hospitals', 'Complete accessibility features throughout', 'Banjara Hills', 17.4156, 78.4489, 'healthcare', 4.6, 35),
  ('Yashoda Hospitals', 'Accessible healthcare facility with support services', 'Secunderabad', 17.4494, 78.4983, 'healthcare', 4.7, 42),
  ('Continental Hospitals', 'Modern accessible hospital with comprehensive facilities', 'Gachibowli', 17.4400, 78.3509, 'healthcare', 4.5, 30);

-- Public Places
INSERT INTO locations (name, description, address, lat, lng, category, ratings, review_count)
VALUES
  ('Charminar', 'Historic monument with accessibility improvements', 'Charminar Road, Hyderabad', 17.3616, 78.4747, 'entertainment', 4.0, 50),
  ('Salar Jung Museum', 'Museum with wheelchair access and ramps', 'Salar Jung Road', 17.3714, 78.4804, 'entertainment', 4.2, 35),
  ('Golconda Fort', 'Partially accessible historic fort with some wheelchair routes', 'Ibrahim Bagh', 17.3833, 78.4011, 'entertainment', 3.8, 40),
  ('Prasads IMAX', 'Fully accessible multiplex with modern facilities', 'NTR Gardens Road', 17.4081, 78.4692, 'entertainment', 4.5, 55),
  ('Ramoji Film City', 'Entertainment complex with accessibility features', 'Anaspur Village', 17.2543, 78.6808, 'entertainment', 4.3, 48);

-- Offices
INSERT INTO locations (name, description, address, lat, lng, category, ratings, review_count)
VALUES
  ('Microsoft India', 'Modern accessible office building', 'Gachibowli', 17.4399, 78.3489, 'other', 4.6, 25),
  ('Amazon Development Centre', 'Fully accessible workplace', 'Financial District, Nanakramguda', 17.4174, 78.3531, 'other', 4.7, 28),
  ('Google India', 'Accessible office with modern amenities', 'Kondapur', 17.4579, 78.3718, 'other', 4.8, 30),
  ('Deloitte Towers', 'Wheelchair-accessible office complex', 'Financial District', 17.4147, 78.3481, 'other', 4.5, 22),
  ('Salesforce Hyderabad', 'Modern accessible workplace', 'Hitec City', 17.4505, 78.3778, 'other', 4.6, 24);

-- Add basic accessibility features for each location
INSERT INTO accessibility_features (location_id, name, description)
SELECT 
  l.id,
  'wheelchairAccessible',
  'Wheelchair accessible entrance and interior'
FROM locations l;

-- Add additional common accessibility features
INSERT INTO accessibility_features (location_id, name, description)
SELECT 
  l.id,
  'accessibleParking',
  'Designated accessible parking spaces'
FROM locations l
WHERE category IN ('healthcare', 'entertainment', 'other');

INSERT INTO accessibility_features (location_id, name, description)
SELECT 
  l.id,
  'accessibleRestroom',
  'Accessible restroom facilities'
FROM locations l
WHERE category IN ('restaurant', 'healthcare', 'entertainment', 'other');

INSERT INTO accessibility_features (location_id, name, description)
SELECT 
  l.id,
  'elevator',
  'Elevator access available'
FROM locations l
WHERE category IN ('healthcare', 'other');