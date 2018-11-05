import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: `${theme.spacing.unit * 3}px`,
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing.unit,
    },
    divider: {
      margin: `${theme.spacing.unit * 2}px 0`,
    },
  });

class Design extends Component {

    state = {
        spacing: '16',
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {

        const styles = {
            root: {
                display: 'grid',

            },
            paper: {
                height: 500,
                width: 100,
            }
        }

        return (
            <Grid container className={styles.root} spacing={0}>
                <Grid item xs={8}>
                    <Paper className={styles.paper}>xs=8</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={styles.paper}>xs=4</Paper>
                </Grid>
            </Grid>
        )
    }
}

export default Design;
