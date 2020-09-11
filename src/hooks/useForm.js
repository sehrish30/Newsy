import  {useState, useEffect} from 'react'
import {toast} from "../helpers/toast"

const useForm = (initialState, validate, action) => {

    const [values, setValues]= useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(()=>{
        if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors){
                action();
                setValues(initialState);
                setSubmitting(false);
            }else{
                toast(Object.values(errors).join(" "));
                setSubmitting(false);
            }
        }
        // eslint-disable-next-line
    },[errors])

   function handleChange(event){
       setValues((previousValues)=>({
           ...previousValues,
           [event.target.name]: event.target.value
       }))
   }

   function handleSubmit() {
       const validationErrors = validate(values);
       setErrors(validationErrors);
       setSubmitting(true);
   }

    return {
        handleSubmit, handleChange, values, errors, isSubmitting 
    }
}

export default useForm;
