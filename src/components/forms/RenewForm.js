import React, {useState} from "react"
import Typography from "@material-ui/core/Typography";
import {Form, Formik} from "formik";
import {Button, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import registers from "../../config/registers"

import Loader from "../Table/Loader";
import api from "../../config/api";
import TextInput from "../TextInput";
import * as Yup from "yup";

const RenewForm = ({onContinue}) => {
    const classes = useStyles()
    const [licenseTypeOptions, setLicenseTypeOptions] = useState([])
    const handleChange = (value, name, setFieldValue) => {
        setFieldValue(name, value)
    }
    const handleSubmit = (values) => {
        alert(JSON.stringify(values))
        console.log(values)
    }
    const handleRegisterTypeChange = (value) => {
        const licenseTypes = registers.filter(register => register.name === value)[0].licenseTypes
        setLicenseTypeOptions(licenseTypes.map(licenseType => ({
            value: licenseType.name,
            label: licenseType.name.replaceAll('_', ' ')
        })))
    }

    const registerOptions = registers.map(register => ({value: register.name, label: register.label}))

    return (
        <Formik initialValues={{licenseType: '', license: '', register: '', years: 1}} validationSchema={Yup.object({
            register: Yup.string().max(256).required(),
            licenseType: Yup.string().max(256).required(),
            license: Yup.string().min(6).max(256).required(),
            years: Yup.number().min(1).max(50)
        })} onSubmit={(values) => {
            handleSubmit(values)
            onContinue()
        }}>
            {
                ({isSubmitting, touched, setFieldValue, errors}) => (
                    <Form>
                        {/*<Loader loading={isSubmitting}/>*/}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AppSelect labelId={'registerType'} inputLabel={'Register type'}
                                           name={'register'} error={touched.register && errors.register}
                                           onChange={({target}) => {
                                               handleChange(target.value, 'register', setFieldValue)
                                               handleRegisterTypeChange(target.value)
                                           }}
                                           options={registerOptions}/>
                            </Grid>
                            <Grid item xs={12}>
                                <AppSelect labelId={'licenseType'} inputLabel={'License type'}
                                           name={'licenseType'} error={touched.licenseType && errors.licenseType}
                                           onChange={({target}) => handleChange(target.value, 'licenseType', setFieldValue)}
                                           options={licenseTypeOptions}/>

                            </Grid>
                            <Grid item xs={12}>
                                <TextInput name={"license"} type={"text"}
                                           label="License Number"
                                           variant="outlined"
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput name={"years"} type={"number"}
                                           label="Number of Years"
                                           variant="outlined"
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type={"submit"} color="primary" size={"small"} fullWidth
                                        className={classes.containedButton}>
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
    )
}

const AppSelect = ({error, labelId, inputLabel, name, onChange, options = []}) => {
    return (
        <FormControl variant={'outlined'} error={error} fullWidth>
            <InputLabel id={labelId}>{inputLabel}</InputLabel>
            <Select
                fullWidth
                labelId={labelId}
                label={labelId}
                name={name}
                onChange={onChange}
            >
                <MenuItem value={''}>None</MenuItem>
                {options.map(option => <MenuItem value={option.value}>{option.label}</MenuItem>)}
            </Select>
            <FormHelperText>
                <Typography color={"secondary"}>
                    {error}
                </Typography>
            </FormHelperText>
        </FormControl>
    )
}
const useStyles = makeStyles({
    containedButton: {
        height: 55
    },
    alertContainer: {
        flexGrow: 1
    },
    imgContainer: {
        marginBottom: 15
    }
})

export default RenewForm