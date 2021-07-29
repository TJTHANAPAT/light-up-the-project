import Loading from './Loading';
import Box from '@material-ui/core/Box';

export default function LoadingCover() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Loading />
    </Box>
  );
}
