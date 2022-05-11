import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default class TabPanel extends Component {

    render() {
        const {
            children, value, index, ...other
        } = this.props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
}