import React, { useState } from 'react';
import { User, Mail, Briefcase, MapPin, Edit3, X } from 'lucide-react';

// Profile data structure
const initialProfileData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  title: 'Lead Frontend Developer',
  location: 'San Francisco, CA',
  bio: 'Passionate developer focusing on building responsive, accessible, and high-performance user interfaces using React and Tailwind CSS.',
};

/**
 * MyProfile Component - Displays and allows editing of user profile information.
 */
const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfileData);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real application, you would send this data to a backend API (e.g., Firestore).
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isEditing 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
            }`}
            aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {/* Placeholder Image using a random color background */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-semibold border-4 border-white shadow-lg">
              {profile.name.charAt(0)}
            </div>
            {/* Add an option to change photo if needed */}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-md text-indigo-600 flex items-center mt-1">
            <Briefcase className="w-4 h-4 mr-1" />
            {profile.title}
          </p>
        </div>

        {/* Profile Details (View Mode) */}
        {!isEditing ? (
          <div className="space-y-4">
            <DetailItem Icon={Mail} label="Email" value={profile.email} />
            <DetailItem Icon={MapPin} label="Location" value={profile.location} />
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <p className="text-sm font-semibold text-gray-600 mb-2">About Me</p>
              <p className="text-gray-800 leading-relaxed">{profile.bio}</p>
            </div>
          </div>
        ) : (
          /* Profile Details (Edit Mode) */
          <div className="space-y-6">
            <InputField label="Full Name" name="name" value={profile.name} onChange={handleChange} Icon={User} />
            <InputField label="Email Address" name="email" value={profile.email} onChange={handleChange} Icon={Mail} type="email" />
            <InputField label="Job Title" name="title" value={profile.title} onChange={handleChange} Icon={Briefcase} />
            <InputField label="Location" name="location" value={profile.location} onChange={handleChange} Icon={MapPin} />
            <TextareaField label="Biography" name="bio" value={profile.bio} onChange={handleChange} rows={4} />
            
            <button
              onClick={handleSave}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for displaying details
const DetailItem = ({ Icon, label, value }) => (
  <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
    <Icon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

// Helper component for input fields in edit mode
const InputField = ({ label, name, value, onChange, Icon, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150"
      />
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
    </div>
  </div>
);

// Helper component for textarea in edit mode
const TextareaField = ({ label, name, value, onChange, rows }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150"
    />
  </div>
);

export default MyProfile;
