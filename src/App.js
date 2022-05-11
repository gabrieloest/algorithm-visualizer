import React, { Component } from 'react';
import './App.css';
import PathfinderVisualizer from './pathfinder/visualizer/Visualizer';
import SortVisualizer from './sort/visualizer/Visualizer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      value: 0
    };
  }

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {

    return (
      <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
            <Tab label="Sort Algorithms" {...this.a11yProps(0)} />
            <Tab label="Pathfinding Algorithms" {...this.a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.value} index={0}>
          <SortVisualizer></SortVisualizer>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <PathfinderVisualizer></PathfinderVisualizer>
        </TabPanel>
      </div>
    );

  }
}
