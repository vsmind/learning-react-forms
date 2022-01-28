import {useEffect, useState} from "react";

const SimpleInput = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

    useEffect(() => {
        if (enteredNameIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [enteredNameIsValid]);

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);
    }

    const nameInputBlurHandler = (event) => {
        setEnteredNameIsTouched(true);
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        setEnteredNameIsTouched(true);

        if (!enteredNameIsValid) {
            return;
        }

        console.log(enteredName);

        setEnteredName("");
        setEnteredNameIsTouched(false);
    }

    const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';

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
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
