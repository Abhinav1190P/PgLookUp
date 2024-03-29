import React, { useEffect, useState } from 'react'
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
import { toast } from "react-hot-toast";
import useAxiosPrivate from '@hooks/useAxiosPrivate';
import ReactPaginate from 'react-paginate';
import './pagination.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Location, HomeIcon } from '@assets/icons';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
        getValues,
    } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues,
        mode: 'onChange'
    });
    const totalSteps = () => {
        return steps.length;
    };

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


    const [photos, setPhotos] = useState([]);

    const api = useAxiosPrivate();
    const [gender, setGender] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [sharing, setSharing] = useState('');
    const [facilityType, setFacilityType] = useState('');


    const handleChange = (event, setState) => {
        setState(event.target.value);
    };



    const [open, setOpen] = React.useState(false);
    const [Files, SetFiles] = React.useState([])
    const [submitting, setSubmitting] = React.useState(null)


    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleDropzoneChange = (files) => {
        setPhotos([...photos, ...files]);
    };
    const onSubmit = () => { }
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
    const SubmitData = async () => {
        try {
            const uploadedPhotoUrls = [];
            const uniqueSet = new Set(photos);
            const arrayWithoutDuplicates = Array.from(uniqueSet);
            setSubmitting(true)
            for (const file of arrayWithoutDuplicates) {
                const formData2 = new FormData();
                formData2.append('file', file);
                formData2.append('upload_preset', 'jkcrcc6s');

                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/doz6iabbi/upload',
                    {
                        method: 'POST',
                        body: formData2,
                    }
                );
                const data = await response.json();
                const fileLink = data.secure_url;
                uploadedPhotoUrls.push(fileLink);
            }

            const formData = getValues();
            const obj = {
                ...formData,
                photos: uploadedPhotoUrls,
            };


            const response = await api.post("http://localhost:4000/api/user/PostProperty", obj);
            const data = response.data;
            setPropertyFormData(data.property);

            if (data) {
                SetFiles([])
                setPhotos([])
                handleClose()
                setSubmitting(false)
                reset(defaultValues);
                toast.success('Successfully created your property!')
            }


        } catch (error) {
            setPropertyFormData(null);
            toast.error(error.message)
        }
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
                                    <MenuItem value="Hostel">Hostel</MenuItem>
                                    <MenuItem value="PG">PG</MenuItem>
                                    <MenuItem value="Flat">Flat</MenuItem>
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
                                    {...field} s
                                    labelId="gender-label"
                                    id="gender"
                                    size='small'
                                    error={!!errors?.gender}
                                    helperText={errors?.gender?.message}
                                >
                                    <MenuItem value="Boys">Boys</MenuItem>
                                    <MenuItem value="Girls">Girls</MenuItem>
                                    <MenuItem value="Boys&Girls">Boys&Girls</MenuItem>
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
                                    <MenuItem value="Female">Female</MenuItem>
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
                    <Grid item xs={2}>  <Button variant='contained' onClick={() => { getValues().name !== '' ? handleNext() : null }} type="submit">Next</Button></Grid>
                )}

                <Grid item xs={1}><Button onClick={handleClose}>Close</Button></Grid>
            </Grid>

        </form>
    )

    const UploadPhotos = (
        <Box >
            <DropzoneArea
                acceptedFiles={['image/jpeg', 'image/png']}
                maxFileSize={3000000}
                filesLimit={4}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={handleDropzoneChange}
            />
            <Grid item xs={2}><Button variant='contained' onClick={() => { SubmitData() }}>Submit</Button></Grid>
        </Box>
    )


    const [itemOffset, setItemOffset] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const [properties, setProperties] = React.useState([])
    const itemsPerPage = 6;
    const nav = useNavigate()

    const [page, setPage] = React.useState(1);


    const handlePageClick = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };


    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        gender: '',
        accommodationType: '',
        facilityType: '',
    });

    const handleFilterChange = (filterName, value) => {

        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };


    useEffect(() => {

        const filtered = properties.filter(property => {
            return (
                (filters.gender === '' || property.gender === filters.gender) &&
                (filters.accommodationType === '' || property.type === filters.accommodationType) &&
                (filters.facilityType === '' || property.facility_type === filters.facilityType)
            );
        });

        setFilteredProperties(filtered);

    }, [filters, properties]);


    console.log(filteredProperties)

    React.useEffect(() => {
        const FetchProperties = async () => {
            const response = await api.get(`http://localhost:4000/api/user/GetProperties?page=${page}&pageSize=${itemsPerPage}`);
            const data = response.data;

            setProperties(data?.properties);
            setPageCount(data?.totalPages);

            setFilteredProperties(data?.properties);
        };

        FetchProperties();
    }, [page, itemsPerPage]);


    const StepComponents = [PropertyForm, UploadPhotos];

    const PropertyCard = ({ item }, i) => {

        return (
            <Grid item xs={4} key={i}>
                <Card key={i} sx={{ maxWidth: 395 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="170"
                        image={item.photos[0]}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item?.name}
                        </Typography>
                        <Typography
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 2,
                            }}
                            variant="body2"
                            color="text.secondary"
                        >
                            {item.description}
                        </Typography>
                        <Grid pt={1} container alignItems="center" spacing={1}>
                            <Grid item>
                                <Location />
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2" component="div">
                                    {item?.location?.city}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <HomeIcon />
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2" component="div">
                                    {item?.type}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='h6' component='div'>For:</Typography>
                            </Grid>
                            <Grid item> <Typography gutterBottom variant="body1" component="div">
                                {" "} {item?.gender}
                            </Typography></Grid>
                        </Grid>
                        <Grid pt={1} container alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography gutterBottom variant='h6' component='div'>Owner: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2" component="div">
                                    {item?.owner?.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid pt={1} container alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography gutterBottom variant='h6' component='div'>Starting price {"(for one)"}: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2" component="div">
                                    {item?.rent?.single}$
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' size="small" onClick={() => { nav(`/user/listings/${item._id}`) }}>Learn more</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
    const [openSnackbar, setOpenSnackbar] = React.useState(false);


    const triggerCloseWithFormActive = () => {
        if (window.confirm('Are you sure you want to close?')) {
            handleConfirm();
        } else {
            handleCancel();
        }

    };

    const handleConfirm = () => {
        reset()
        setPhotos([])
        handleClose();
    };

    const handleCancel = () => {
        return;
    };


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
                                onChange={(event) => handleFilterChange('gender', event.target.value)}
                            >
                                <MenuItem value="Boys">Boys</MenuItem>
                                <MenuItem value="Girls">Girls</MenuItem>
                                <MenuItem value="Boys&Girls">Boys&Girls</MenuItem>
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
                                onChange={(event) => handleFilterChange('accommodationType', event.target.value)}

                            >
                                <MenuItem value="Hostel">Hostel</MenuItem>
                                <MenuItem value="PG">PG</MenuItem>
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
                                onChange={(event) => handleFilterChange('facilityType', event.target.value)}

                            >
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="AC">AC</MenuItem>
                                <MenuItem value="Balcony">Balcony</MenuItem>
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
                onClose={triggerCloseWithFormActive}
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
                        submitting ?
                            <Grid>
                                Submitting...
                            </Grid> : StepComponents[activeStep]
                    )}



                </Box>
            </Modal>

            <Grid container>
                <Grid container pl={5} pt={5} spacing={8}>
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((item, i) => (
                            <PropertyCard item={item} i={i} />
                        ))
                    ) : (
                        <Grid item xs={12}>No properties found</Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <div className="pagination-container">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageLinkClassName="page-num"
                            previousLinkClassName="page-num"
                            nextLinkClassName="page-num"
                            activeLinkClassName="active"
                        />
                    </div>
                </Grid>
            </Grid>


        </Grid>
    )
}
