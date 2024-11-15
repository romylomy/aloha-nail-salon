// references chatgpt code


// Import required types from Next.js for API request and response handling
import { NextApiRequest, NextApiResponse } from 'next';
// Import server-side logic for fetching staff details based on ID
import { getStaffById } from '@/server-actions/staff'; 

// API route handler for fetching staff data by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the staff ID from the query parameters in the request
  const { id } = req.query;

  // Handle GET requests to fetch staff information
  if (req.method === 'GET') {
    try {
      // Call the function to get staff by the provided ID
      const result = await getStaffById(id as string);
      
      // If the staff was found, send a success response with the staff data
      if (result.success) {
        console.log(result.data)  // Optionally log the staff data to the console
        res.status(200).json(result.data);  // Respond with a 200 status and staff data
      } else {
        // If the staff was not found, respond with a 404 status
        res.status(404).json({ message: 'Staff not found' });
      }
    } catch (error) {
      // If an error occurs during the request handling, send a 500 error response
      res.status(500).json({ message: 'Error fetching staff data' });
    }
  } else {
    // If the request method is not GET, return a 405 Method Not Allowed error
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
