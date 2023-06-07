import React, { useState, useEffect } from 'react';

const UserProfilePage = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from the server using the provided userId
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Contact Number: {user.contactNumber}</p>
                <p>Role: {user.role}</p>
                <p>Status: {user.status ? 'Active' : 'Inactive'}</p>
            </div>
        </div>
    );
};

export default UserProfilePage;
