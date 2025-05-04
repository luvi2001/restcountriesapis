import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      await axios.post('https://restcountriesapis.onrender.com/api/auth/signup', {
        email,
        name,
        phone,
        countryName,
        password,
      });
      alert('User registered successfully');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-green-700 mb-6">Create an Account 🌍</h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              placeholder="Phone number"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              placeholder="Country name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button
            className="text-green-600 hover:underline"
            onClick={() => navigate('/')}
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
