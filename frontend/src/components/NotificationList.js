import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';

const NotificationList = () => {
  const { token } = useContext(Store);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 italic">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <p className="text-lg font-medium text-gray-800 leading-snug">
                {note.message}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
