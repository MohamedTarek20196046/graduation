import React, { useState } from 'react';
import styles from './Contacts.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Contacts() {
  const initialFormData = {
    name: '',
    email: '',
    complaint: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    complaint: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if any values are missing
    const errors = { name: false, email: false, complaint: false };
    if (!formData.name.trim()) {
      errors.name = true;
    }
    if (!formData.email.trim()) {
      errors.email = true;
    }
    if (!formData.complaint.trim()) {
      errors.complaint = true;
    }
    setFormErrors(errors);

    // if any errors, return early
    if (errors.name || errors.email || errors.complaint) {
      return;
    }
    toast.success('Thank you for you compaint we will contact you soon ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    // perform any necessary actions with formData, such as sending it to a server

    console.log(formData);

    // clear the form fields
    setFormData(initialFormData);
  };

  return (
    <>
      <section id="contact" className={`${styles.contact} `}>
        <div className={`container text-center p-4 `}>
          <h3 className="text-center my-md-4">Contact Us</h3>
          <form onSubmit={handleSubmit} className="rounded p-4">
            <div className="row gy-3">
              <div className="col-md-6">
                <input
                  className={`form-control ${styles.formControlBg}`}
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <div className="text-danger">Name is required</div>}
              </div>

              <div className="col-md-6">
                <input
                  className={`form-control ${styles.formControlBg}`}
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <div className="text-danger">Email is required</div>}
              </div>
              <div className="col-md-12">
                <textarea
                  className={`form-control ${styles.formControlBg}`}
                  placeholder="Enter your complaint"
                  rows="7"
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.complaint && <div className="text-danger">Complaint is required</div>}
              </div>
            </div>
            <button
              className={`btn btn-info text-white mt-4 ${styles.submitBtn} rounded-pill`}
              type="submit"
            >
              submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}