import { useQuery } from '@tanstack/react-query';

import { ImSpinner9 } from 'react-icons/im';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: admin = {}, isLoading } = useQuery({
    queryKey: ['admin-profile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/profile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ImSpinner9 className="animate-spin text-4xl text-yellow-700" />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-yellow-50 rounded-2xl shadow-md max-w-md mx-auto mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
        Admin Profile
      </h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={admin.image || user?.photoURL || '/default-avatar.png'}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover shadow"
        />
        <div className="text-center">
          <p className="text-lg font-semibold text-yellow-700">
            {admin.name || user?.displayName}
          </p>
          <p className="text-base text-gray-700">{admin.email}</p>
          <p className="text-base text-black font-medium">Role: Admin</p>
          {admin.lastLogin && (
            <p className="text-xs text-gray-500 mt-2">
              Last Login: {new Date(admin.lastLogin).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
