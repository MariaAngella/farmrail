import * as React from 'react'
import {useField} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {hasValue, IOption} from "./inputHelpers";



const XSelectInput = (props) => {
    const {name, options,variant, ...rest} = props
    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)
    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return <FormControl error={showError} fullWidth variant={variant} margin='normal' size={props.size}>
        <InputLabel htmlFor={name} ref={inputLabel}>{rest.label}</InputLabel>
        <Select
            {...rest}
            value={meta.value || (props.multiple ? [] : '')}
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
            multiple={rest.multiple}
            inputProps={{name}}
            labelWidth={labelWidth}
        >
            {
                options.map(
                    it => <MenuItem
                        value={it.value}
                        key={it.value}
                    >{it.label}</MenuItem>
                )
            }
        </Select>
        {
            showError && <FormHelperText>{error}</FormHelperText>
        }
    </FormControl>
}

export default XSelectInput