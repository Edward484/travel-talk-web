import React from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../lib/theme/colors';
import { CategoryTopicApiResponse } from '../../api/types/topic';
import { Link } from 'react-router-dom';

interface TopicProps {
  topic: CategoryTopicApiResponse;
}

const Topic: React.FC<TopicProps> = ({ topic }) => {
  return (
    <Link to={`/topic/${topic.topicId}`}>
      <Box
        bgcolor={colors.paper}
        width="100%"
        sx={{ ':hover': { boxShadow: '1px 3px 4px #acacac' } }}
        px="1rem"
        py="0.25rem"
      >
        <Box marginBottom="0.25rem">
          <Typography variant="h3" fontSize="18px" fontWeight="500">
            {topic.title}
          </Typography>
        </Box>
        <Box marginBottom="0.25rem">
          <Typography variant="body1" fontSize="1rem">
            {topic.description}
          </Typography>
        </Box>
        {topic.authorUsername && (
          <Box>
            <Typography
              variant="body2"
              fontSize="0.75rem"
              fontWeight="300"
              color={colors.textDisabled}
            >
              {`posted by @ ${topic.authorUsername}`}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default Topic;
