const validateCreateLink = (values) => {
    let errors= {};

    //Description Errors
    if(!values.description){
        errors.description ="Description is required"
    }else if(values.description.length < 10){
        errors.description = "Description must be atleast 10 characters";
    }

    // /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    
    //Password Errors
    if(!values.url){
        errors.url = "URL is required";
    }else if(!/^(ftp|https|https):\/\/[^ "]+$/.test(values.url)){
        errors.url= "Please enter a valid URL";
    }
    return errors;
    
}

export default validateCreateLink
