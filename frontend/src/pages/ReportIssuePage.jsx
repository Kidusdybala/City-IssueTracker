import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Upload, X, Plus, CheckCircle } from 'lucide-react';
import { useIssues } from '../contexts/IssueContext';

const ReportIssuePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
  });
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { createIssue } = useIssues();
  const navigate = useNavigate();

  const categories = [
    { value: 'road', label: 'Roads & Infrastructure', icon: '🛣️', color: 'from-blue-500 to-blue-600' },
    { value: 'waste', label: 'Waste Management', icon: '🗑️', color: 'from-green-500 to-green-600' },
    { value: 'electricity', label: 'Electricity & Lighting', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { value: 'water', label: 'Water & Sewage', icon: '💧', color: 'from-cyan-500 to-cyan-600' },
    { value: 'parks', label: 'Parks & Recreation', icon: '🌳', color: 'from-emerald-500 to-emerald-600' },
    { value: 'safety', label: 'Public Safety', icon: '🚨', color: 'from-red-500 to-red-600' },
    { value: 'other', label: 'Other', icon: '📝', color: 'from-gray-500 to-gray-600' },
  ];

  const getCurrentLocation = () => {
    setLocationLoading(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Simulate reverse geocoding (in a real app, use a service like Google Maps API)
        const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setLocation({
          latitude,
          longitude,
          address: mockAddress
        });
        setLocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please try again.');
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) {
      alert('You can only upload up to 5 photos');
      return;
    }
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      alert('Please provide your location');
      return;
    }

    setLoading(true);
    
    try {
      await createIssue({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location,
        photos
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to create issue:', error);
      alert('Failed to report issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Issue Reported Successfully!</h2>
          <p className="text-gray-400 mb-4">Your report has been submitted and will be reviewed soon.</p>
          <div className="text-sm text-gray-500">Redirecting to dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
          <p className="text-gray-400">Help make your city better by reporting problems in your area</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">What type of issue are you reporting?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.category === category.value
                      ? `bg-gradient-to-r ${category.color} border-white/20 shadow-lg scale-105`
                      : 'bg-gray-700/30 border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <span className={`text-sm font-medium ${
                      formData.category === category.value ? 'text-white' : 'text-gray-300'
                    }`}>
                      {category.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Issue Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Issue Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Issue Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Provide more details about the issue, its impact, and any other relevant information"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Location</h2>
            
            {location ? (
              <div className="flex items-center justify-between p-4 bg-green-600/20 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Location captured</p>
                    <p className="text-green-300 text-sm">{location.address}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLocation(null)}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-white font-medium mb-1">
                    {locationLoading ? 'Getting your location...' : 'Get Current Location'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {locationLoading ? 'Please wait...' : 'We need your location to help officials find the issue'}
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Photos */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Photos (Optional)</h2>
            
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={photos.length >= 5}
              className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-white font-medium mb-1">
                  {photos.length > 0 ? `Add More Photos (${photos.length}/5)` : 'Add Photos'}
                </p>
                <p className="text-gray-400 text-sm">
                  Photos help officials understand the issue better
                </p>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !location}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Reporting Issue...' : 'Report Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssuePage;