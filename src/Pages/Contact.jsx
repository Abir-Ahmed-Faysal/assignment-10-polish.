import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-xl text-secondary mx-auto p-6">
      <h2 className="text-4xl font-bold mb-4 text-center text-primary">Contact Us</h2>
      <p className="text-lg mb-6 text-center text-gray-600">
        Have questions or want to make a reservation? Reach out to us!
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input input-bordered w-full"
          required
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Your Message"
          rows="4"
          required
        ></textarea>
        <button className="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
