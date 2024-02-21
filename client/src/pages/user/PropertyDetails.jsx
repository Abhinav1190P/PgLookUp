import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import useAxiosPrivate from '@hooks/useAxiosPrivate';

export default function PropertyDetails() {
    const params = useParams();
    const api = useAxiosPrivate();
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    
    useEffect(() => {
        const fetchSingleProperty = async () => {
            try {
                const response = await api.get(`http://localhost:4000/api/user/GetSingleProperty?propertyid=${params?.id}`);
                const data = response.data;
                if (data) {
                    setProperty(data?.property);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching property:', error);
                setLoading(false);
            }
        };
        fetchSingleProperty();
    }, [api, params.id]);
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">{property.name}</Typography>
                <Typography variant="h6">Type: {property.type}</Typography>
                <Typography variant="h6">Gender: {property.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardMedia
                        component="img"
                        height="400"
                        image={property.photos[currentImageIndex] || property.photos[0]}
                        alt={property.name}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Typography variant="h6">Location: Address: {property.location.address} City: {property.location.city}</Typography>
                        <Typography variant="h6">Rent:</Typography>
                        <Typography variant="h6">Single: {property.rent.single}</Typography>
                        <Typography variant="h6">Double: {property.rent.double}</Typography>
                        <Typography variant="h6">Triple: {property.rent.triple}</Typography>
                        <Typography variant="h6">Facility Type: {property.facility_type}</Typography>
                        <Typography variant="h6">Description:</Typography>
                        <Typography variant="h6">{property.description}</Typography>
                        <Typography variant="h6">Owner: {property.owner.name}</Typography>
                        <Typography variant="h6">Contact: {property.owner.contact}</Typography>
                        <Typography variant='h6'>Description: </Typography>
                        <Typography variant="body2">{property.description}</Typography>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Photos:</Typography>
                        {property.photos.map((photo, index) => (
                            <Button key={index} onClick={() => handleImageChange(index)}>
                                <img src={photo} alt={`Property ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
