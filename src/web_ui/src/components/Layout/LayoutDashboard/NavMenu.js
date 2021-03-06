import React, {Fragment} from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppsIcon from '@material-ui/icons/Apps';
import PeopleIcon from '@material-ui/icons/People';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import { useHistory, useLocation } from 'react-router-dom'
import { localRoutes } from "../../AppRoutes/constants";
import appLogo from "./Farmrail-logo-plain.png";
import { navBackgroundColor } from "./styles";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import grey from '@material-ui/core/colors/grey';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AssignmentIcon from '@material-ui/icons/Assignment';
import EventNoteIcon from '@material-ui/icons/EventNote';


const routes = [
    {
        name: "Dashboard",
        route: localRoutes.dashboard,
        icon: AppsIcon
    },
    {
        name: "Q&A Forum",
        icon: PeopleIcon,
        route: localRoutes.forum
       
    },
    {
        name: "Information Panel",
        route: localRoutes.info,
        icon: SettingsIcon,
        
    },
    {
        name: "Customers",
        icon: PeopleIcon,
        items: [
            {
                name: "Wholesalers",
                route: localRoutes.wholesalers
            },
            {
                name: "Personal",
                route: localRoutes.personal
            }
        ]
    },
    
    {
        name: "My Farm",
        icon: EmojiPeopleIcon,
        items: [
            {
                name: "location",
                route: localRoutes.myfarm
            }
        ]
    },
    

    {
        name: "Farm Products",
        icon: AssignmentIcon,
        items: [
            {
                name: "Plants",
                route: localRoutes.plants
            },
            {
                name: "Animals",
                route: localRoutes.animals
            }
        ]
    },
    {
        name: "My Diary",
        route: localRoutes.mydiary,
        icon: EventNoteIcon
    },
    {
        name: "Alerts",
        route: localRoutes.alerts,
        icon: HelpIcon
    }
    ,
    {
        name: "Settings",
        route: localRoutes.settings,
        icon: EventNoteIcon
    }
    
]
const menBackgroundColor = grey[800]
const useStyles = makeStyles((theme) =>
    createStyles({

        logoHolder: {
            height: 140
        },
        logo: {
            [theme.breakpoints.only('xs')]: {
                height: 50,
                width: 'auto',
            },
            height: 58,
            width: 'auto',
        },
        whiteText: {
            color: 'white'
        },
        menuItem: {
            "&:hover": {
                backgroundColor: menBackgroundColor,
            }
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);


const StyledListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: menBackgroundColor
        }
    },
    selected: {}
})(ListItem)

const NavMenu = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = React.useState({});

    const handleMenuClick = (name) => () => {
        const menuData = { ...open, [name]: !open[name] }
        setOpen(menuData);
    };

    const onClick = (path) => () => {
        const { onClose } = props
        history.push(path)
        if (onClose)
            onClose()
    }
    const pathMatches = (path, str) => path.indexOf(str) > -1

    const isSelected = (pathStr) => {
        const { pathname } = location
        return pathMatches(pathname, pathStr)
    }

    return (
        <div style={{ backgroundColor: navBackgroundColor }}>
            <Grid className={classes.logoHolder}
                container
                spacing={0}
                alignContent='center'
                justify='center'>
                <img src={appLogo} alt="logo" className={classes.logo} />
            </Grid>
            <Divider />
            <List style={{ paddingTop: 0 }}>
                {
                    routes.map(it => {
                        const Icon = it.icon
                        if (it.items) {
                            return <Fragment key={it.name}>
                                <StyledListItem button onClick={handleMenuClick(it.name)}>
                                    <ListItemIcon>
                                        <Icon className={classes.whiteText} />
                                    </ListItemIcon>
                                    <ListItemText primary={it.name} className={classes.whiteText} />
                                    {open[it.name] ? <ExpandLess className={classes.whiteText} /> :
                                        <ExpandMore className={classes.whiteText} />}
                                </StyledListItem>
                                <Collapse in={open[it.name] || isSelected(it.name.toLocaleLowerCase())} timeout="auto"
                                          unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            it.items.map(ch => <StyledListItem
                                                button
                                                onClick={onClick(ch.route)}
                                                selected={isSelected(ch.route)}
                                                key={ch.name}
                                                className={classes.menuItem}
                                                classes={{
                                                    selected: classes.menuItem
                                                }}
                                            >
                                                <ListItemText inset primary={ch.name} className={classes.whiteText} />
                                            </StyledListItem>)
                                        }
                                    </List>
                                </Collapse>
                            </Fragment>
                        }
                        return <StyledListItem
                            button
                            onClick={onClick(it.route)}
                            selected={isSelected(it.route)}
                            key={it.name}
                            className={classes.menuItem}
                            classes={{
                                selected: classes.menuItem
                            }}
                        >
                            <ListItemIcon>
                                <Icon className={classes.whiteText} />
                            </ListItemIcon>
                            <ListItemText primary={it.name} className={classes.whiteText} />
                        </StyledListItem>
                    })
                }
            </List>
        </div>
    );
}


export default NavMenu;