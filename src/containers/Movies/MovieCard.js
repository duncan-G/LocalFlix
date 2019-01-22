import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 245,
    margin: 10
  },
  media: {
    height: 250
  },
  title: {
    display: 'inline-block'
  },
  date: {}
};

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => props.handleClick(movie.id)}>
        <CardMedia
          className={classes.media}
          image={movie.thumbnailUrl}
          title={movie.name}
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {movie.name}
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            Added on {moment(movie.createdAt).format('ll')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCard);
