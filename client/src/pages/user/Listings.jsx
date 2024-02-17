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
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Listings() {
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
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </Grid>
    )
}
