import User from "../models/user.models.js";

export const getUsersForSidebar = async (req, res) => {
    try {   
        const loggedInUserId = req.user.id;
        const filteredUsers = await User.find().select("-password");

        res.status(200).json(filteredUsers);
    
    } catch (error) {
        console.error("Error fetching users for sidebar:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};