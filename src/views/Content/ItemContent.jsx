import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Skeleton from '@material-ui/lab/Skeleton';

// custom components
import TabPanel from '../../components/Navigation/TabPanel';
import CustomCard from '../../components/Surface/CustomCard';
import CustomSwitch from '../../components/Input/CustomSwitch';
import NoContentCard from '../../components/Surface/NoContentCard';

// assets
import placeholder from '../../assets/img/placeholder.png';


const useStyles = makeStyles(() => ({
  gridContainer: {
    justifyContent: 'center'
  },
  gridItem: {
    margin: '15px'
  },
  card: {
    minWidth: 320,
    maxWidth: 320,
  },
  cardMedia: {
    height: 200,
  },
}));

export default function ItemContent(props) {
  const classes = useStyles();
  const { items, actionFunc, isLoading, value, idx } = props;

  const renderItems = () => {
    if(isLoading) {
      return (
        <Grid item className={classes.gridItem}>
          <Skeleton animation='wave' variant="rect" width={250} height={180} />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' width="60%" />
      </Grid>
      );
    } else if (!items || items.length < 1) {
      return <NoContentCard />
    } else {
      return (
        items.map((item, idx) => (
          <Grid key={`${item.title}-${idx}`} item className={classes.gridItem}>
              <CustomCard 
                  title={item.name}
                  description={item.description}
                  img={item.image ? item.image.url : placeholder}
                  onClick={() => actionFunc(item)}
                  isLoading={isLoading}
              />
          </Grid>
        ))
      )
    }
  }

  const renderMyStuffToggle = () => {
    return props.setMyStuff ? (
      <AppBar style={{ backgroundColor: '#fff' }} elevation={0} position='static'>
        <Toolbar style={{ display: 'flex', justifyContent: 'center', minHeight: '38px' }} >
          <CustomSwitch on={props.myStuff} setOn={props.setMyStuff} />
        </Toolbar>
      </AppBar>
    ) : undefined
  }

  return (
    <TabPanel value={value} index={idx}>
      {renderMyStuffToggle()}
      <Grid container className={classes.gridContainer}>
        {renderItems()}
      </Grid>
    </TabPanel>
  );
}