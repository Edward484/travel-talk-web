import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import colors from '../../lib/theme/colors';
import { CategoryTopicApiResponse } from '../../api/types/topic';
import { Link } from 'react-router-dom';
import FadeMenu from "../post/fadeMenuButton";
import VoteButton from "../post/VoteButton";

interface TopicProps {
  topic: CategoryTopicApiResponse;
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  return (

      <Box
        bgcolor={colors.paper}
        width="100%"
        sx={{ ':hover': { boxShadow: '1px 3px 4px #acacac' } }}
        px="1rem"
        py="0.25rem"
      >
          <Grid style={{display :"flex" ,justifyContent:'space-between' }}>
              <Link to={`/Topic/${topic.categoryId}/${topic.topicId}`}>
                <Grid pr={{xs:'15rem', md:'34rem', xl:'40rem'}} style={{width: '100%'}} >
                <Box marginBottom="0.25rem" width="160px">
                  <Typography variant="h3" fontSize="18px" fontWeight="500">
                    {topic.title}
                  </Typography>
                </Box>
                <Box marginBottom="0.25rem" width="160px">
                  <Typography variant="body1" fontSize="1rem">
                    {topic.description}
                  </Typography>
                </Box>
                {topic.authorUsername && (
                  <Box width="160px">
                    <Typography
                      variant="body2"
                      fontSize="0.75rem"
                      fontWeight="300"
                      color={colors.textDisabled}
                    >
                      {`created by @ ${topic.authorUsername}`}
                    </Typography>
                  </Box>
                )}
                </Grid>
              </Link>


            <Grid style={{display:'flex', alignItems: 'center'}}>
              <FadeMenu postId={-1} topicId={topic.topicId}/>
            </Grid>
          </Grid>
      </Box>
  );
};

export default Topic;
