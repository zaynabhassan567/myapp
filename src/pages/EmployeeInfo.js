import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import employeesData from '../data/employeesData';
import EmployeeCard from '../components/EmployeeCard';
import '../App.css';
import './EmployeeInfoPage.css';
import Navigation from '../components/Navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EmployeeInfoPage() {
  const [employees, setEmployees] = useState(employeesData);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState(null);
  const [sortBy, setSortBy] = useState('id');

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 1500);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter(emp => emp.id !== id));
    showToast('Employee deleted successfully!');
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setFieldValue('image', url);
    }
  };

  const countryCodes = [
    { code: '+92', label: 'Pakistan' },
    { code: '+91', label: 'India' },
    { code: '+1', label: 'USA' },
    { code: '+44', label: 'UK' },
    { code: '+61', label: 'Australia' },
  ];

  const handleAddEmployee = (values, { resetForm }) => {
    const newEmployee = {
      id: 'EMP' + (employees.length + 1).toString().padStart(3, '0'),
      name: values.name,
      position: values.position,
      phone: values.phone,
      email: values.email,
      image: values.image || undefined,
    };
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
    setPreviewImage('');
    setFile(null);
    showToast('Employee added successfully!');
    resetForm();
  };

  // Sort employees based on sortBy
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === 'id') {
      return a.id.localeCompare(b.id);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Yup validation schema
  const phoneRegExp = /^\d{4}-\d{7}$/;
  const nameRegExp = /^[A-Za-z\s]+$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(nameRegExp, 'Name must only contain letters and spaces')
      .min(4, 'Name must be at least 4 characters')
      .required('Name is required'),
    position: Yup.string().required('Position is required'),
    countryCode: Yup.string().required('Country code is required'),
    phone: Yup.string()
      .matches(/^\d{10,12}$/, 'Phone must be 10-12 digits (without country code)')
      .required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    image: Yup.string().url('Image must be a valid URL').nullable().notRequired(),
  });

  return (
    <div className="employee-info-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-msg">{toast.message}</div>
      )}
      {/* 🔲 Welcome Banner with Buttons */}
      <section className="welcome-banner">
        <h1>Hey! Welcome to the Employee Info Page</h1>
      </section>
      <Navigation />

      {/* Sort By Dropdown */}
      <div className="sort-by-row">
        <label htmlFor="sort-by-select" style={{fontWeight:'bold', marginRight:'8px'}}>Sort by:</label>
        <select id="sort-by-select" value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-by-select">
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* 🧑‍💼 Team Section */}
      <section className="team-section">
        <h2>MEET OUR TEAM</h2>
      </section>

      {/* 👥 Cards */}
      <div className="employee-grid">
        {sortedEmployees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} onDelete={() => handleDelete(emp.id)} />
        ))}
        <div className="add-employee-card">
          <button className="add-employee-btn" onClick={() => setShowForm(true)}>+ Add an Employee</button>
        </div>
      </div>
      {/* Modal for Add Employee Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => { setShowForm(false); setPreviewImage(''); setFile(null); }}>✖️</button>
            <Formik
              initialValues={{ name: '', position: '', countryCode: '+92', phone: '', email: '', image: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                const newEmployee = {
                  id: 'EMP' + (employees.length + 1).toString().padStart(3, '0'),
                  name: values.name,
                  position: values.position,
                  phone: `${values.countryCode}${values.phone}`,
                  email: values.email,
                  image: values.image || undefined,
                };
                setEmployees([...employees, newEmployee]);
                setShowForm(false);
                setPreviewImage('');
                setFile(null);
                showToast('Employee added successfully!');
                actions.resetForm();
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className="add-employee-form modal-form">
                  <Field name="name" placeholder="Name" />
                  <ErrorMessage name="name" component="div" className="form-error" />
                  <Field name="position" placeholder="Position" />
                  <ErrorMessage name="position" component="div" className="form-error" />
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Field as="select" name="countryCode" className="country-code-select">
                      {countryCodes.map(opt => (
                        <option key={opt.code} value={opt.code}>{opt.code} ({opt.label})</option>
                      ))}
                    </Field>
                    <Field name="phone" placeholder="Phone (without country code)" style={{ flex: 1 }} />
                  </div>
                  <ErrorMessage name="phone" component="div" className="form-error" />
                  <ErrorMessage name="countryCode" component="div" className="form-error" />
                  <Field name="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" className="form-error" />
                  <Field name="image" placeholder="Image URL (optional)" />
                  <ErrorMessage name="image" component="div" className="form-error" />
                  <input type="file" accept="image/*" onChange={e => handleFileChange(e, setFieldValue)} />
                  {(values.image || previewImage) && <img src={values.image || previewImage} alt="Preview" style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto'}} />}
                  <div style={{display:'flex', gap:'8px', marginTop:'8px', justifyContent:'center'}}>
                    <button type="submit" className="add-btn">Add</button>
                    <button type="button" className="cancel-btn" onClick={() => { setShowForm(false); setPreviewImage(''); setFile(null); }}>Cancel</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeInfoPage;
