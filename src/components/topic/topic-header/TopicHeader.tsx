import { Box, Typography } from '@mui/material';
import React from 'react';
import { Topic } from '../../../models/topic';
import colors from '../../../lib/theme/colors';

interface TopicHeaderProps {
  topic: Topic;
}

const TopicHeader: React.FC<TopicHeaderProps> = ({ topic }) => {
  return (
    <Box
      bgcolor={colors.secondaryDark}
      width="100%"
      padding="3rem"
      sx={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}
      minHeight="100px"
    >
      <Typography variant="h1" color={colors.textInverted} fontWeight="700">
        {topic.title}
      </Typography>
      <Typography variant="h3" color={colors.textInverted} fontWeight="500">
        {topic.description}
      </Typography>
    </Box>
  );
};
export default TopicHeader;
