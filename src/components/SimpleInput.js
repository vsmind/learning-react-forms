import {useRef, useState} from "react";

const SimpleInput = (props) => {
    const nameInputRef = useRef();
    const [enteredName, setEnteredName] = useState("");
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        setEnteredNameIsTouched(true);

        if (enteredName.trim() === "") {
            setEnteredNameIsValid(false);
            return;
        }

        setEnteredNameIsValid(true);

        console.log(enteredName);

        // ref can be better if we check value on form submission
        const enteredValue = nameInputRef.current.value;
        console.log(enteredValue);

        setEnteredName("");
    }

    const nameInputBlurHandler = (event) => {
        setEnteredNameIsTouched(true);

        if (enteredName.trim() === "") {
            setEnteredNameIsValid(false);
            return;
        }
    }

    const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

    const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text'
                       id='name'
                       onChange={nameInputChangeHandler}
                       ref={nameInputRef}
                       value={enteredName}
                       onBlur={nameInputBlurHandler}/>
                {nameInputIsInvalid && <p className="error-text">Entered name must not be empty.</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
