import useInput from "../hooks/use-input";

const nameValidation = (value) => {
    return value.trim() !== ""
}

const emailValidation = (value) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return value.match(emailPattern);
}

const BasicForm = (props) => {

    const {
        value: nameInput,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        isValid: nameIsValid,
        reset: nameReset
    } = useInput(nameValidation);

    const {
        value: lastnameInput,
        hasError: lastnameHasError,
        valueChangeHandler: lastnameChangeHandler,
        inputBlurHandler: lastnameBlurHandler,
        isValid: lastnameIsValid,
        reset: lastnameReset
    } = useInput(nameValidation);

    const {
        value: emailInput,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        isValid: emailIsValid,
        reset: emailReset
    } = useInput(emailValidation);

    let formIsValid = false;

    if (nameIsValid && lastnameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        console.log(nameInput);
        console.log(lastnameInput);
        console.log(emailInput);

        nameReset();
        lastnameReset();
        emailReset();
    }

    const nameClass = nameHasError ? 'form-control invalid' : 'form-control'
    const lastnameClass = lastnameHasError ? 'form-control invalid' : 'form-control'
    const emailClass = emailHasError ? 'form-control invalid' : 'form-control'

    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <div className={nameClass}>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text'
                           id='firstname'
                           onChange={nameChangeHandler}
                           onBlur={nameBlurHandler}
                           value={nameInput}
                    />
                    {nameHasError && <p className="error-text">Name input invalid</p>}
                </div>
                <div className={lastnameClass}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' 
                           id='lastname'
                           onChange={lastnameChangeHandler}
                           onBlur={lastnameBlurHandler}
                           value={lastnameInput}
                    />
                    {lastnameHasError && <p className="error-text">Lastname input invalid</p>}
                </div>
            </div>
            <div className={emailClass}>
                <label htmlFor='email'>E-Mail Address</label>
                <input type='text'
                       id='email'
                       onChange={emailChangeHandler}
                       onBlur={emailBlurHandler}
                       value={emailInput}
                />
                {emailHasError && <p className="error-text">Email input invalid</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
