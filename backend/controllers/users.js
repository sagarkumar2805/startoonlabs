// auth.js (or a new controller file)
// Import the User model
import User from '../models/User.js';

// Route handler to get all users
export const getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.find();

        // Send the users as a response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAverageUserCountByMonth = async (req, res) => {
    try {
        // Aggregate data to calculate average count per month
        const result = await User.aggregate([
            {
                $group: {
                    _id: { $month: '$updatedAt' },
                    averageCount: { $avg: '$count' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Map the result to add month names
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const averageCounts = result.map(item => ({
            month: months[item._id - 1],
            averageCount: item.averageCount
        }));

        // Send the result as a response
        res.status(200).json(averageCounts);
    } catch (error) {
        console.error('Error calculating average user count by month:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Route handler to get a single user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters

    try {
        // Find the user by ID
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user as a response
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


