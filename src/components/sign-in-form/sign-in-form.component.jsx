import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.conponent";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    navigate('/');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password!");
          break;
        case "auth/user-not-found":
          alert("User with this email is not found!");
          break;
        case "auth/too-many-requests":
          alert(
            "Access to this account has been temporarily disabled due to many failed login attempts"
          );
          break;
      }
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />

        <FormInput
          label='Password'
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
            minLength: "6",
          }}
        />
        <div className='buttons-container'>
          <Button children='Sign In' type='submit' />
          <Button
            type='button'
            children='Google Sign In'
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
