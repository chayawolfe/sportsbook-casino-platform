import merge from 'lodash/merge';
import { Theme } from '@mui/material/styles';
//
import Fab from './components/fab';
import Card from './components/card';
import Chip from './components/chip';
import Tabs from './components/tabs';
import Menu from './components/menu';
import Link from './components/link';
import Lists from './components/list';
import Table from './components/table';
import Alert from './components/alert';
import Badge from './components/badge';
import Paper from './components/paper';
import Stack from './components/stack';
import AppBar from './components/appbar';
import Drawer from './components/drawer';
import Dialog from './components/dialog';
import Avatar from './components/avatar';
import Rating from './components/rating';
import Slider from './components/slider';
import Button from './components/button';
import Switch from './components/switch';
import Select from './components/select';
import Tooltip from './components/tooltip';
import Popover from './components/popover';
import Stepper from './components/stepper';
import SvgIcon from './components/svg-icon';
import Skeleton from './components/skeleton';
import Backdrop from './components/backdrop';
import Progress from './components/progress';
import Timeline from './components/timeline';
import Checkbox from './components/checkbox';
import DataGrid from './components/data-grid';
import TreeView from './components/tree-view';
import TextField from './components/textfield';
import Accordion from './components/accordion';
import Typography from './components/typography';
import Pagination from './components/pagination';
import Breadcrumbs from './components/breadcrumbs';
import CssBaseline from './components/css-baseline';
import RadioButton from './components/radio-button';
import ButtonGroup from './components/button-group';
import Autocomplete from './components/autocomplete';
import MuiDatePicker from './components/date-picker';
import ToggleButton from './components/toggle-button';
import LoadingButton from './components/loading-button';

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
    const components = merge(
        Fab(theme),
        Tabs(theme),
        Chip(theme),
        Card(theme),
        Menu(theme),
        Link(theme),
        Stack(theme),
        Badge(theme),
        Lists(theme),
        Table(theme),
        Paper(theme),
        Alert(theme),
        Switch(theme),
        Select(theme),
        Button(theme),
        Rating(theme),
        Dialog(theme),
        AppBar(theme),
        Avatar(theme),
        Slider(theme),
        Drawer(theme),
        Stepper(theme),
        Tooltip(theme),
        Popover(theme),
        SvgIcon(theme),
        Checkbox(theme),
        DataGrid(theme),
        Skeleton(theme),
        Timeline(theme),
        TreeView(theme),
        Backdrop(theme),
        Progress(theme),
        TextField(theme),
        Accordion(theme),
        Typography(theme),
        Pagination(theme),
        RadioButton(theme),
        ButtonGroup(theme),
        Breadcrumbs(theme),
        CssBaseline(theme),
        Autocomplete(theme),
        ToggleButton(theme),
        MuiDatePicker(theme),
        LoadingButton(theme)
    );

    return components;
}
