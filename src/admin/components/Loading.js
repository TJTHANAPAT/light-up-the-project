import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" my={10}>
      <CircularProgress />
    </Box>
  );
}
