import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { FcApproval } from 'react-icons/fc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RiMailSendLine } from 'react-icons/ri';
import dayjs from 'dayjs';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    setLoading(true);
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      await sheet.addRow(row);
      setLoading(false);
      setAlert(true);
      setForm({
        name: '',
        email: '',
        topic: '',
        description: '',
      });
    } catch (e) {
      console.error('Error: ', e);
      setLoading(false);
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
        Date: dayjs().format('DD MMMM YYYY hh:mm:ss A'),
      };
      appendSpreadsheet(newRow);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <form
        className="space-y-3 w-full max-w-lg mx-auto p-5 relative pt-10"
        onSubmit={submitForm}
      >
        {alert && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-center">
            <FcApproval className="inline-block mr-2" size={22} />
            <strong className="font-bold mr-1">Success!</strong>
          </div>
        )}
        <p className="font-bold text-2xl text-center">Contact Form</p>
        <label className="block">
          <span className="text-gray-700 font-semibold">Full Name</span>
          <input
            name="name"
            type="text"
            className="form-input form-field-contact"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
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
            value={form.email}
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
            value={form.topic}
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Description</span>
          <textarea
            name="description"
            className="form-textarea form-field-contact resize-none"
            rows="3"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
          />
        </label>
        <button
          className="bg-green-200 px-3 py-1 font-semibold shadow-md rounded-md w-40 border-2 border-green-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="animate-spin">
                <AiOutlineLoading3Quarters size={18} />
              </div>
              <p>Sending</p>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <RiMailSendLine size={20} />
              <p>Send Message</p>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
