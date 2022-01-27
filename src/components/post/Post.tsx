import React from 'react';
import { Post as PostModel } from '../../models/post';
import {Box, Grid, Typography} from '@mui/material';
import colors from '../../lib/theme/colors';
import { formatDate } from '../../lib/utils/string-utils';
import FadeMenu from "./fadeMenuButton";

interface PostProps {
  post: PostModel;
}

const Post: React.FC<PostProps> = ({ post }) => {
    console.log(post.AuthorName)
  return (
    <Box paddingX="1rem" paddingY="0.5rem" bgcolor={colors.paper}>
        <Grid style={{display :"flex" ,justifyContent:'space-between' }}>
            <Grid>
              <Box marginBottom="0.25rem">
                <Typography variant="body2" color={colors.textDisabled}>
                  @{post.AuthorName} at {formatDate(new Date(post.createdAt))}
                </Typography>
              </Box>
              <Box marginBottom="0.75rem">
                <Typography variant="body1">{post.content}</Typography>
              </Box>
              <Box width="200px">
                <img style={{ width: '200px' }} src={post.imageUrl} />
              </Box>
            </Grid>
          {/*    TODO: Add upvote button*/}
          {/*    TODO: Add report button*/}
          <FadeMenu/>
        </Grid>
    </Box>
  );
};

export default Post;
