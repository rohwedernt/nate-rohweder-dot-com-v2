import React, { Fragment, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

// custom components
import TabPanel from './TabPanel';
import CustomCard from '../Surface/CustomCard';
import CustomDialogFullScreen from '../Dialogs/CustomDialogFullScreen';

// utilities
import { scrollTo } from '../../utilities/scrollTo';

// data
import { CardTypes } from '../../data/cardTypes';
import { workSection } from '../../data/work';
import { musicSection } from '../../data/music';
import { travelSection } from '../../data/travel';
import { foodAndDrinkSection } from '../../data/foodAndDrink';
import { astronomySection } from '../../data/astronomy';


const useStyles = makeStyles(() => ({
  root: {
    margin: '60px auto',
    flexGrow: 1,
    width: '100%',
    '& .MuiTab-root:hover': {
        color: '#3f51b5'
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center'
    },
    // '& .MuiTab-root': {
    //     backgroundColor: '#fff',
    //     margin: '25px',
    //     color: 'black',
    //     borderRadius: '5px',
    //     height: '90px',
    //   },
    //   '& .Mui-selected': {
    //     backgroundColor: '#3f51b5',
    //     color: '#fff',
    //     boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    //   },
    //   '& .MuiTab-wrapper': {
    //       fontSize: '11px',
    //       fontWeight: 'bold',
    //   },
    //   '& .MuiTab-fullWidth': {
    //       //flexGrow: 0
    //   },
    //   '& .MuiTab-labelIcon': {
    //     minWidth: '95px',
    //   }
  },
  gridContainer: {
    justifyContent: 'center'
  },
  gridItem: {
    margin: '15px'
  }
}));

export default function SectionTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [dialogData, setDialogData] = useState({imgs: [], label: 'Untitled'});
  const [openFullDialog, setOpenFullDialog] = useState(false);
  const sections = [workSection, musicSection, travelSection, foodAndDrinkSection, astronomySection]

  const handleClickOpenFullDialog = (imgs, label) => {
    setDialogData({ imgs: imgs, label: label })
    setOpenFullDialog(true);
  };

  const handleCloseFullDialog = () => {
    setOpenFullDialog(false);
  };

  const handleChange = (event, newValue) => {
    scrollTo(props.breakpointSm);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const getActionFuncForCardType = (type, url, imgs, label) => {
    let actionFunc;
    let imgArr = [];
    imgArr = imgs && [...imgs];

    switch(type) {
      case CardTypes.url:
        actionFunc = () => {window.open(url, '_blank')};
        break;
      case CardTypes.imgGallery:
        actionFunc = () => handleClickOpenFullDialog(imgArr, label);
        break;
      case CardTypes.audioVideo:
        actionFunc = () => {};
        break;
      default:
        actionFunc = () => {};
    }

    return actionFunc;
  }

  const renderSections = () => (
    sections.map((section, idx) => (
      <TabPanel key={`s-${idx}`} value={value} index={idx}>
        <Grid container className={classes.gridContainer}>
          {section.data.map((item, idx) => (
            <Grid key={`${item.title}-${idx}`} item className={classes.gridItem}>
              <CustomCard 
                title={item.title}
                desc={item.desc}
                img={item.img}
                url={item.url}
                shareUrl={item.shareUrl}
                onClick={getActionFuncForCardType(item.type, item.url, item.imgs, item.title)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    ))
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" color={'transparent'} elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {sections.map(section => <Tab style={props.style} icon={section.icon} label={props.style ? '': section.label} />)}
          </Tabs>
        </AppBar>
        <SwipeableViews axis={'x'} index={value} onChangeIndex={handleChangeIndex} >
          {renderSections()}
        </SwipeableViews>
      </div>
      <CustomDialogFullScreen 
        open={openFullDialog}
        handleClose={handleCloseFullDialog}
        data={dialogData}
      />
    </Fragment>
  );
}
