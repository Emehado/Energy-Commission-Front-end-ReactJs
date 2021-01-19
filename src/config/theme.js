import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#AECCF1',
            main: '#1976D2',
            dark: '#0958B8',
            gray: '#DAE1E3',
            contrastText: '#fff',
        },
        secondary: {
            extraLight: '#FFEAE7',
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

export default theme;