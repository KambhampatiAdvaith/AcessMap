/*
  # Initial Schema Setup for AccessMap

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `locations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `address` (text)
      - `lat` (float8)
      - `lng` (float8)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references profiles)
      - `ratings` (float8)
      - `review_count` (int)
    
    - `accessibility_features`
      - `id` (uuid, primary key)
      - `location_id` (uuid, references locations)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `location_id` (uuid, references locations)
      - `user_id` (uuid, references profiles)
      - `rating` (int)
      - `comment` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create locations table
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text NOT NULL,
  lat float8 NOT NULL,
  lng float8 NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  ratings float8 DEFAULT 0,
  review_count int DEFAULT 0,
  CONSTRAINT valid_category CHECK (category IN ('restaurant', 'park', 'transit', 'shopping', 'entertainment', 'healthcare', 'education', 'government', 'other'))
);

-- Create accessibility_features table
CREATE TABLE accessibility_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(location_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessibility_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Locations policies
CREATE POLICY "Locations are viewable by everyone"
  ON locations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert locations"
  ON locations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own locations"
  ON locations FOR UPDATE
  USING (auth.uid() = created_by);

-- Accessibility features policies
CREATE POLICY "Accessibility features are viewable by everyone"
  ON accessibility_features FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert accessibility features"
  ON accessibility_features FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Create functions
CREATE OR REPLACE FUNCTION update_location_ratings()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE locations
  SET 
    ratings = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE location_id = NEW.location_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE location_id = NEW.location_id
    ),
    updated_at = now()
  WHERE id = NEW.location_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating location ratings
CREATE TRIGGER update_location_ratings_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_location_ratings();