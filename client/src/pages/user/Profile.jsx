import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles } from '@mui/styles'
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import propertyImage from "assets/images/property.jpg";
import FeaturedPost from "./FeaturedPGS";
import Grid from "@mui/material/Grid";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  parentContainer: {
    position: 'relative',
    maxWidth: '100%', // Set maxWidth to 100%
    margin: 'auto',

  },
  introContainer: {
    position: 'relative',
    maxWidth: '100%',
    margin: 'auto',
    padding: 0,
    background: 'black'
  },
  introImage: {
    width: '100%',
    height: '50vh',
    display: 'block',
    objectFit: 'cover',
    position: 'relative',
    opacity: .6
  },
  introOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    width: '100%',
    padding: 2,
  },
  introText: {
    fontSize: 36,
    marginBottom: 2,
  },
  introButtons: {
    marginTop: 2,
    '& > *': {
      margin: 10,
    },
  },
}));

const Profile = () => {
  const api = useAxiosPrivate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api
      .get("/api/user/profile")
      .then(({ data }) => {
        setInfo(data);
      })
      .catch((error) => {
        setInfo(null);
        console.log(error);
      });
  }, []);
  const classes = useStyles();

  const featuredPosts = [
    {
      title: 'Best Rated Hostels',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      title: 'PG & Rooms',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
  ];


  return (
    <Container className={classes.parentContainer}>
      <Container className={classes.introContainer}>
        <img src={propertyImage} alt="Intro Image" className={classes.introImage} />
        <Box className={classes.introOverlay}>
          <Typography variant="h2" className={classes.introText}>
            Explore. Discover. Stay.
          </Typography>
          <Box className={classes.introButtons}>
            <Button variant="contained" color="primary">Explore</Button>
            <Button variant="outlined" color="inherit" style={{ color: "white", borderColor: "white" }}>Button 2</Button>
          </Box>
        </Box>

      </Container>
      <Grid style={{ marginTop: 5 }} container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>

      <Footer
        title="PgLookUp"
        description="All rights reserved"
      />

     {/*  {info ? (
        <>
          <Typography>Name: {info.name}</Typography>
          <Typography>Email: {info.email}</Typography>
        </>
      ) : (
        "loading"
      )} */}
    </Container>
  );
};

export default Profile;
