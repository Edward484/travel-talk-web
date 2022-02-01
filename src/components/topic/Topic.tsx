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
        py="0.45rem"
        borderRadius={3}
      >
          <Grid style={{display :"flex", flexDirection:'row', justifyContent:'space-between'}}>
              <Link to={`/Topic/${topic.categoryId}/${topic.topicId}`} style={{ textDecoration: 'none' }}>
                <Grid
                      style={{display:'flex', flexDirection:'column'}} >
                    <Box marginBottom="0.25rem">
                      <Typography variant="h3" fontSize="18px" fontWeight="500" color="text"
                      sx={{color: 'primary.dark'}}>
                        {topic.title}
                      </Typography>
                    </Box>
                    <Box marginBottom="0.25rem" >
                      <Typography variant="body1" fontSize="1rem" color="text"
                       sx={{color: 'text.primary'}}>
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
