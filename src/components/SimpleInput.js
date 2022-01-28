import {useState} from "react";

const SimpleInput = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
    const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const enteredEmailIsValid = enteredEmail.match(emailPattern);
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);
    }

    const nameInputBlurHandler = () => {
        setEnteredNameIsTouched(true);
    }

    const emailInputChangeHandler = (event) => {
      setEnteredEmail(event.target.value);
    }

    const emailInputBlurHandler = () => {
      setEnteredEmailIsTouched(true)
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        setEnteredNameIsTouched(true);
        setEnteredEmailIsTouched(true);

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        console.log(enteredName);

        setEnteredName("");
        setEnteredNameIsTouched(false);

        setEnteredEmail("");
        setEnteredEmailIsTouched(false);
    }

    const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputIsInvalid ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text'
                       id='name'
                       onChange={nameInputChangeHandler}
                       value={enteredName}
                       onBlur={nameInputBlurHandler}/>
                {nameInputIsInvalid && <p className="error-text">Entered name must not be empty.</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input type='email'
                       id='email'
                       onChange={emailInputChangeHandler}
                       value={enteredEmail}
                       onBlur={emailInputBlurHandler}/>
                {emailInputIsInvalid && <p className="error-text">Entered email should be in a valid format.</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
