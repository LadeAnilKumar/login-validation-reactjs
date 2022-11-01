import React, { useState } from "react";

import "./App.css";

const App= () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmitted] = useState(false);

  const changeHandler = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    setErrors(ValidateErrors(values))
    if(values.fullname && values.email && (values.password.length >= 4 && values.password.length <= 8)){
      setIsSubmitted(true)
    }
  };


  const ValidateErrors = (values) => {
    let errors = {};
    if (!values.fullname) {
      errors.fullname = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be 4 characters";
    } else if (values.password.length > 8) {
      errors.password = "Password is too lengthy"
    }

    return errors;
  };

 const renderForm = (
    <div className="app-container">
    <form onSubmit={onSubmitForm}>
      <div className="form-container">
        <h1 className="heading"> Create Account</h1>
        <div>
          <label className="label">Full Name</label>
          <br />
          <input
            type="text"
            className="input"
            name="fullname"
            value={values.fullname}
            onChange={changeHandler}
          />
        </div>
        {errors.fullname && <p className="error"> {errors.fullname}</p>}
        <div>
          <label className="label">Email</label> <br />
          <input
            type="email"
            className="input"
            name="email"
            value={values.email}
            onChange={changeHandler}
          />
        </div>

        {errors.email && <p className="error"> {errors.email}</p>}
        <div>
          <label className="label">Password</label> <br />
          <input
            type="password"
            className="input"
            name="password"
            value={values.password}
            onChange={changeHandler}
          />
        </div>
        {errors.password && <p className="error"> {errors.password}</p>}
        <div className="button-container">
          <button className="button" type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
 )

 return (
  <div className="app">
    <div className="login-form">
      {isSubmit ? <h1 className="success-message">Account Created</h1> : renderForm}
    </div>
  </div>
);
}

export default App;