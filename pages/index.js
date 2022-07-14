import React, { useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      await sheet.addRow(row);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      form.name !== '' &&
      form.email !== '' &&
      form.topic !== '' &&
      form.description !== ''
    ) {
      const newRow = {
        FullName: form.name,
        Email: form.email,
        Topic: form.topic,
        Description: form.description,
      };

      appendSpreadsheet(newRow);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="space-y-3 w-full max-w-lg mx-auto p-5"
        onSubmit={submitForm}
      >
        <p className="font-semibold text-2xl text-center">Contact Form</p>
        <label className="block">
          <span className="text-gray-700 font-semibold">Full Name</span>
          <input
            name="name"
            type="text"
            className="form-input form-field-contact"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Email</span>
          <input
            name="email"
            type="email"
            className="form-input form-field-contact"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Topic</span>
          <input
            name="topic"
            type="text"
            className="form-input form-field-contact"
            placeholder="Topic"
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Description</span>
          <textarea
            name="description"
            className="form-textarea form-field-contact"
            rows="3"
            placeholder="Description"
            onChange={handleChange}
          />
        </label>

        <button
          className="bg-green-200 px-3 py-1 font-semibold shadow-md rounded-md"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
