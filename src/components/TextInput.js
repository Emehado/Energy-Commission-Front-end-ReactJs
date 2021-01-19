import {useField} from "formik";
import {TextField} from "@material-ui/core";
import React from "react";

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return <TextField {...field} label={label} {...props} error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}/>
}

export default TextInput