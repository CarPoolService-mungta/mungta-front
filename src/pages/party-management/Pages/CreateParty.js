import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import MoveInfoRegister from './moveInfoRegister';
const CreateParty = () => {
    return (
        <>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                            <Typography variant="h3">운전정보 등록</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <MoveInfoRegister />
                    </Grid>
                </Grid>

        </>
    );
};

export default CreateParty;
