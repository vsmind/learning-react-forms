import {useState} from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

    const {
        value: enteredName,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        isValid: enteredNameIsValid,
        reset: resetNameInput
    } = useInput(value => value.trim() !== "");

    const emailValidation = (value) => {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return value.match(emailPattern);
    }

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        isValid: enteredEmailIsValid,
        reset: resetEmailInput
    } = useInput(emailValidation);

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        console.log(enteredName);

        resetNameInput();
        resetEmailInput();
    }

    const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text'
                       id='name'
                       onChange={nameChangedHandler}
                       value={enteredName}
                       onBlur={nameBlurHandler}/>
                {nameInputHasError && <p className="error-text">Entered name must not be empty.</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input type='email'
                       id='email'
                       onChange={emailChangeHandler}
                       value={enteredEmail}
                       onBlur={emailBlurHandler}/>
                {emailInputHasError && <p className="error-text">Entered email should be in a valid format.</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
