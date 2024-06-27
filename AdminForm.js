import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

// Validation schema using Yup
const validationSchema = yup.object({
  companyName: yup.string().required('Company Name is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  contactNumber: yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Contact number is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  zip: yup.string().required('Zip is required'),
  gstNumber: yup.string().required('GST Number is required'),
  subscription: yup.string().required('Subscription is required'),
});

// Function to generate a random ID
const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000); // Adjust the range as needed
};


const FormComponent = () => {

  const handleSubmit = (values, actions) => {
    // Retrieve existing data from localStorage or initialize as empty array
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];

    // Assign ID, createdDate, createdBy
    const newData = {
      ...values,
      id: generateRandomId(), // Generate random ID
      createdDate: new Date().toLocaleDateString(), // Current date
      createdBy: 'Admin', // Replace with actual user data or logged-in user
    };

    // Add new form data to the array
    const updatedData = [...existingData, newData];

    // Store updated data back into localStorage
    localStorage.setItem('formData', JSON.stringify(updatedData));

    // Reset form values and set submitting to false
    actions.resetForm();
    actions.setSubmitting(false);

    // Show alert or any other UI indication of successful form submission
    alert('Form data submitted and saved to localStorage!');
  };


  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <h5 className="card-header text-center p-3">Company Details</h5>
            <div className="card-body">
              <Formik
                initialValues={{
                  companyName: '',
                  address: '',
                  email: '',
                  contactNumber: '',
                  city: '',
                  state: '',
                  country: '',
                  zip: '',
                  gstNumber: '',
                  subscription: '',
                  gridCheck: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label htmlFor="companyName" className="form-label">Company Name</label>
                      <Field type="text" className="form-control" id="companyName" name="companyName" placeholder="Enter company name" />
                      <ErrorMessage name="companyName" component="div" className="error text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
                      <ErrorMessage name="email" component="div" className="error text-danger" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <Field type="text" className="form-control" id="address" name="address" placeholder="Enter address" />
                    <ErrorMessage name="address" component="div" className="error text-danger" />
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <label htmlFor="city" className="form-label">City</label>
                      <Field type="text" className="form-control" id="city" name="city" placeholder="Enter city" />
                      <ErrorMessage name="city" component="div" className="error text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label">State</label>
                      <Field as="select" className="form-control" id="state" name="state">
                        <option value="">Choose...</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                       </Field>
                      <ErrorMessage name="state" component="div" className="error text-danger" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="country" className="form-label">Country</label>
                      <Field as="select" className="form-control" id="country" name="country">
                        <option value="">Choose...</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>

                      </Field>
                      <ErrorMessage name="country" component="div" className="error text-danger" />
                    </div>

                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label htmlFor="zip" className="form-label">Zip</label>
                      <Field type="text" className="form-control" id="zip" name="zip" placeholder="Enter pincode" />
                      <ErrorMessage name="zip" component="div" className="error text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                      <Field type="text" className="form-control" id="contactNumber" name="contactNumber" placeholder="Enter contact number" />
                      <ErrorMessage name="contactNumber" component="div" className="error text-danger" />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label htmlFor="gstNumber" className="form-label">GST Number</label>
                      <Field type="text" className="form-control" id="gstNumber" name="gstNumber" placeholder="Enter GST number" />
                      <ErrorMessage name="gstNumber" component="div" className="error text-danger" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subscription" className="form-label">Subscription</label>
                      <Field as="select" className="form-control" id="subscription" name="subscription">
                        <option value="">Choose...</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </Field>
                      <ErrorMessage name="subscription" component="div" className="error text-danger" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <Field type="checkbox" className="form-check-input" id="gridCheck" name="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                      </label>
                    </div>
                    <ErrorMessage name="gridCheck" component="div" className="error text-danger" />
                  </div>
                  <div className="d-flex gap-2 justify-content-center">
                    <button type="submit" className="btn btn-primary pr-2">Save</button>
                    <button type="reset" className="btn btn-secondary  pr-2">Reset</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;

