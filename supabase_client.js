const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


//Assign the Supabase url and api key to the variables below
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

//Create a client instance of the Supabase database using the above variables
const supabase = createClient(supabaseUrl, supabaseKey)

//Export the instance - so it can be used in other modules and scripts
module.exports = supabase;