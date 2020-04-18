import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// custom components
import ImageCard from '../../Surface/ImageCard';


const useStyles = makeStyles(() => ({
    gridItem: {
      margin: '15px'
    }
  }));

export default function ImageGalleryDialog({ imgs }) {
    const classes = useStyles();

    return (
        <Grid container style={{ justifyContent: 'center' }}>
            {imgs.map(img => (
                <Grid item className={classes.gridItem}>
                    <ImageCard img={img} />
                </Grid>
            ))}
        </Grid>
    );
}