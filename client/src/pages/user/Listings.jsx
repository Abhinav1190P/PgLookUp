import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import * as Yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DropzoneArea } from 'material-ui-dropzone';

const formSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    name: Yup.string().required("Name is required"),
    location: Yup.object().shape({
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
    }),
    photos: Yup.array().of(Yup.string()),
    rent: Yup.object().shape({
        single: Yup.number()
            .typeError("Rent (Single) must be a number")
            .required("Rent (Single) is required"),
        double: Yup.number()
            .typeError("Rent (Double) must be a number")
            .required("Rent (Double) is required"),
        triple: Yup.number()
            .typeError("Rent (Triple) must be a number")
            .required("Rent (Triple) is required"),
    }),
    gender: Yup.string().required("Gender is required"),
    owner: Yup.object().shape({
        name: Yup.string().required("Owner name is required"),
        contact: Yup.string()
            .required("Owner contact is required")
            .matches(/^\d{10}$/, "Owner contact must be a 10-digit number"),
    }),
    facility_type: Yup.string().required("Facility type is required"),
    description: Yup.string().required("Some description is required"),
    ratings: Yup.object().shape({
        overall: Yup.number().min(0).max(5),
        cleanliness: Yup.number().min(0).max(5),
        safety: Yup.number().min(0).max(5),
    }),
});

const defaultValues = {
    type: '',
    name: '',
    location: {
        address: '',
        city: ''
    },
    rent: {
        single: '',
        double: '',
        triple: ''
    },
    gender: '',
    owner: {
        name: '',
        contact: ''
    },
    description: '',
    facility_type: ''
};


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    boxShadow: 'none',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    boxShadow: 'none',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: theme.palette.text.secondary,
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const steps = ['Property Details', 'Upload Pictures'];

export default function Listings() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues,
        mode: 'onChange'
    });
    const totalSteps = () => {
        return steps.length;
    };
    console.log(errors)

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const onSubmit = () => {

    }


    const [propertyFormData, setPropertyFormData] = useState({
        type: '',
        name: '',
        location: {
            address: '',
            city: ''
        },
        photos: [],
        rent: {
            single: 0,
            double: 0,
            triple: 0
        },
        gender: '',
        owner: {
            name: '',
            contact: ''
        },
        facility_type: '',
        description: '',
        ratings: {
            overall: 0,
            cleanliness: 0,
            safety: 0
        }
    });



    const [gender, setGender] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [sharing, setSharing] = useState('');
    const [facilityType, setFacilityType] = useState('');
    const [amenities, setAmenities] = useState('');

    const handleChange = (event, setState) => {
        setState(event.target.value);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const PropertyForm = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel style={{ marginTop: '-5px' }}>Type</InputLabel>
                                <Select
                                    {...field}
                                    labelId="type-label"
                                    id="type"
                                    size='small'
                                    error={!!errors.type}
                                    helperText={errors?.type?.message}
                                >
                                    <MenuItem value="hostel">Hostel</MenuItem>
                                    <MenuItem value="pg">PG</MenuItem>
                                    <MenuItem value="flat">Flat</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Name"
                                size='small'
                                error={!!errors.name}
                                helperText={errors?.name?.message}

                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="location.address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Address"
                                size='small'
                                error={!!errors?.location?.address}
                                helperText={errors?.location?.address?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="location.city"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="City"
                                size='small'
                                error={!!errors?.location?.city}
                                helperText={errors?.location?.city?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="rent.single"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Rent (Single)"
                                type="number"
                                size='small'
                                error={!!errors?.rent?.single}
                                helperText={errors?.rent?.single?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="rent.double"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Rent (Double)"
                                type="number"
                                size='small'
                                error={!!errors?.rent?.double}
                                helperText={errors?.rent?.double?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="rent.triple"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Rent (Triple)"
                                type="number"
                                size='small'
                                error={!!errors?.rent?.triple}
                                helperText={errors?.rent?.triple?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel style={{ marginTop: '-5px' }}>Gender</InputLabel>
                                <Select
                                    {...field}
                                    labelId="gender-label"
                                    id="gender"
                                    size='small'
                                    error={!!errors?.gender}
                                    helperText={errors?.gender?.message}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="owner.name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Owner Name"
                                size='small'
                                error={!!errors?.owner?.name}
                                helperText={errors?.owner?.name?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="owner.contact"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Owner Contact"
                                size='small'
                                error={!!errors?.owner?.contact}
                                helperText={errors?.owner?.contact?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="facility_type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel style={{ marginTop: '-5px' }}>Facility Type</InputLabel>
                                <Select
                                    {...field}
                                    labelId="facility-label"
                                    id="facility"
                                    size='small'
                                    error={!!errors?.facility_type}
                                    helperText={errors?.facility_type?.message}
                                >
                                    <MenuItem value="Regular">Regular</MenuItem>
                                    <MenuItem value="Cooler">Female</MenuItem>
                                    <MenuItem value="AC">AC</MenuItem>
                                    <MenuItem value="Balcony">Balcony</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                size='small'
                                error={!!errors?.description}
                                helperText={errors?.description?.message}
                            />
                        )}
                    />
                </Grid>
                {activeStep === steps.length ? (<Grid item xs={2}>  <Button variant='contained' type="submit">Submit</Button></Grid>) : (
                    <Grid item xs={2}>  <Button variant='contained' onClick={() => { /* errors ? null :  */handleNext() }} type="submit">Next</Button></Grid>
                )}

                <Grid item xs={1}><Button onClick={handleClose}>Close</Button></Grid>
            </Grid>

        </form>
    )

    const UploadPhotos = (
        <Box>
            <DropzoneArea
                acceptedFiles={['image/jpeg', 'image/png']}
                maxFileSize={3000000} // 3 MB in bytes
                filesLimit={4}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => console.log('Files:', files)} />
        </Box>
    )

    const StepComponents = [PropertyForm, UploadPhotos];
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <Item>
                    <Stack flexDirection={'row'} spacing={3}>
                        <Typography fontSize={'30px'} fontWeight={500}>
                            Properties Listing
                        </Typography>
                        <Typography style={{ marginTop: '-3px', marginLeft: '2px' }} variant="body1" fontSize="16px">
                            204
                        </Typography>
                    </Stack>
                </Item>
                <Item>

                    <Stack style={{ width: '80%' }} direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: '-6px' }} id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                value={gender}
                                size='small'
                                style={{ borderRadius: '20px', width: '100%' }} // Set width to 100%
                                onChange={(event) => handleChange(event, setGender)}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: '-6px' }} id="accommodation-type-label">Accommodation Type</InputLabel>
                            <Select
                                labelId="accommodation-type-label"
                                id="accommodation-type"
                                value={accommodationType}
                                size='small'
                                style={{ borderRadius: '20px', width: '100%' }}
                                onChange={(event) => handleChange(event, setAccommodationType)}
                            >
                                <MenuItem value="hostel">Hostel</MenuItem>
                                <MenuItem value="pg">PG</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: '-6px' }} id="sharing-label">Sharing</InputLabel>
                            <Select
                                labelId="sharing-label"
                                id="sharing"
                                value={sharing}
                                size='small'
                                style={{ borderRadius: '20px', width: '100%' }}
                                onChange={(event) => handleChange(event, setSharing)}
                            >
                                <MenuItem value="single">Single</MenuItem>
                                <MenuItem value="double">Double</MenuItem>
                                <MenuItem value="triple">Triple</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: '-6px' }} id="facility-type-label">Facility Type</InputLabel>
                            <Select
                                labelId="facility-type-label"
                                id="facility-type"
                                value={facilityType}
                                size='small'
                                style={{ borderRadius: '20px', width: '100%' }}
                                onChange={(event) => handleChange(event, setFacilityType)}
                            >
                                <MenuItem value="basic">Basic</MenuItem>
                                <MenuItem value="standard">Standard</MenuItem>
                                <MenuItem value="premium">Premium</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: '-6px' }} id="amenities-label">Amenities</InputLabel>
                            <Select
                                labelId="amenities-label"
                                id="amenities"
                                value={amenities}
                                size='small'
                                style={{ borderRadius: '20px', width: '100%' }}

                                onChange={(event) => handleChange(event, setAmenities)}
                            >
                                <MenuItem value="wifi">Wi-Fi</MenuItem>
                                <MenuItem value="ac">AC</MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>
                </Item>
            </Grid>
            <Grid item xs={6} md={4}>
                <Item2>
                    <Stack>
                        <Button onClick={handleOpen} variant='contained'>+ Add Property</Button>
                    </Stack></Item2>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <h2 id="property-modal-title">Add Property</h2>
                    <Stepper style={{ paddingBottom: '20px' }} nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        StepComponents[activeStep]
                    )}



                </Box>
            </Modal>
        </Grid>
    )
}
