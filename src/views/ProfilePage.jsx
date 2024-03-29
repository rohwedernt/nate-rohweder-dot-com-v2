import React, { Fragment, useEffect, useState } from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// custom components
import { SocialIconAnimator } from '../components/Animators/SocialIconAnimator';

// layouts
import ProfileSectionTabs from './ProfileSectionTabs';
import MenuAppBar from './MenuAppBar';

// assets
import { Github, LinkedIn, Twitter, Facebook, Instagram } from '../assets/icons/icons';
import profile from '../assets/img/profile-full.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.background,
    '& > *': {
      margin: theme.spacing(8),
      width: '100%'
    }
  },
  paperMain: {
    backgroundColor: theme.palette.common.paper
  },
  headerSection: {
    display: 'flex',
  },
  pageHeader: {
    width: 'fit-content',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1)
  },
  pageSubheader: {
    textTransform: 'uppercase',
    fontSize: '0.85em',
    fontWeight: 600,
    marginLeft: theme.spacing(3.4),
    marginBottom: theme.spacing(1),
    color: '#6c757d',
    display: 'inline-block'
  },
  pageParagraph: {
    fontFamily: `'Montserrat', sans-serif`,
    color: '#8a8a8a',
    marginLeft: theme.spacing(3.4),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  profileImg: {
      maxWidth: '350px',
      maxHeight: '275px',
      borderRadius: '6px',
      marginLeft: '16px',
      marginTop: '-60px',
      position: 'relative'
  },
  coloredShadow: {
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
        display: 'none !important'
    },
    maxWidth: '350px',
    transform: 'scale(0.94)',
    filter: 'blur(12px)',
    maxHeight: '275px',
    position: 'absolute',
    top: '110px',
    left: '110px'
  },
  animator: {
    display: 'flex',
  }
}));

export default function ProfilePage(props) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const breakpointLg = useMediaQuery('(max-width:1100px)');
    const breakpointMd = useMediaQuery('(max-width:990px)');
    const breakpointSm = useMediaQuery('(max-width:550px)');

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 0);
    }, []);

    const getIconStyles = right => breakpointLg ? {} : { position: 'absolute', top: '-50px', right: right };
    const setColoredShadowPosition = () => breakpointSm ? { top: '85px', left: '20px' } : undefined;

    return (
        <Fragment>
            <MenuAppBar 
              breakpointMd={breakpointMd} 
              breakpointSm={breakpointSm} 
              handleThemeChange={props.handleThemeChange}
              theme={props.theme}
              themeColor={props.themeColor}
              setThemeColor={props.setThemeColor}
              themeType={props.themeType}
              setThemeType={props.setThemeType}
            />
            <div className={classes.root}>
                <Paper className={classes.paperMain} style={breakpointSm ? { margin: '0px', padding: '70px 0px', borderRadius: '6px' } : { padding: '30px', borderRadius: '6px' }} elevation={16}>
                    <div className={classes.headerSection} style={breakpointMd ? { flexWrap: 'wrap' } : undefined}>
                    <img className={classes.coloredShadow} alt='colored-shadow' style={setColoredShadowPosition()} src={profile} />
                        <img className={classes.profileImg} alt='' src={profile} />
                        <div>
                            <Typography 
                                className={classes.pageHeader} 
                                variant='h4'
                            >
                                Nate Rohweder
                            </Typography>
                            <SocialIconAnimator className={classes.animator} pose={isOpen ? 'open' : 'closed'}>
                                <Github style={getIconStyles('205px')} target='https://github.com/rohwedernt' />
                                <LinkedIn style={getIconStyles('155px')} target='https://www.linkedin.com/in/nate-rohweder-8b1026121/' />
                                <Twitter style={getIconStyles('105px')} target='https://twitter.com/nrohweder1' />
                                <Facebook style={getIconStyles('55px')} target='https://www.facebook.com/rohwedernt' />
                                <Instagram style={getIconStyles('5px')} target='https://www.instagram.com/naterohweder/' />
                            </SocialIconAnimator>
                            <Typography className={classes.pageSubheader} variant='h6'>Software Engineer</Typography>
                            <Typography className={classes.pageSubheader} variant='h6' style={{ marginLeft: '10px' }}>|</Typography>
                            <Typography className={classes.pageSubheader} variant='h6' style={{ marginLeft: '10px' }}>Denver Colorado</Typography>
                            <Typography className={classes.pageParagraph} variant='body1' component='div'>
                              Equal parts software experiment laboratory, agglomeration of web resources from over the years,
                              showcase of personal dev projects, blog for my travels, eats, drinks, dogs, and other 
                              miscellaneous interests. Click the info icon on the menu bar for a more in-depth techincal
                              overview of the site.
                            </Typography>
                        </div>
                    </div>
                    <ProfileSectionTabs breakpointMd={breakpointMd} />
                </Paper>
            </div>
        </Fragment>
    );
}
