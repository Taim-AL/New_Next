import * as React from 'react';
import useAutocomplete, {
  AutocompleteGetTagProps,
} from '@mui/material/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { OptionType } from '@/app/lib/definitions';

const Root = styled('div')(({ theme }) => ({
  color: 'rgba(0,0,0,0.85)',
  fontSize: '14px',
  ...theme.applyStyles('dark', {
    color: 'rgba(255,255,255,0.65)',
  }),
}));

const InputWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  border: '2px solid #d9d9d9',
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '5px',
  display: 'flex',
  flexWrap: 'wrap',
  ...theme.applyStyles('dark', {
    borderColor: '#434343',
    backgroundColor: '#141414',
  }),
  '&:hover': {
    borderColor: '#a8a8ff',
    ...theme.applyStyles('dark', {
      borderColor: '#177ddc',
    }),
  },
  '&.focused': {
    borderColor: '#a8a8ff',
    boxShadow: '0 0 0 2px rgb(24 144 255 / 0.2)',
    ...theme.applyStyles('dark', {
      borderColor: '#177ddc',
    }),
  },
  '& input': {
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,.85)',
    height: '30px',
    boxSizing: 'border-box',
    padding: '4px 6px',
    width: '0',
    minWidth: '30px',
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
    ...theme.applyStyles('dark', {
      color: 'rgba(255,255,255,0.65)',
      backgroundColor: '#141414',
    }),
  },
}));

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '24px',
  margin: '2px',
  lineHeight: '22px',
  backgroundColor: '#fafafa',
  border: `1px solid #e8e8e8`,
  borderRadius: '2px',
  boxSizing: 'content-box',
  padding: '0 4px 0 10px',
  outline: 0,
  overflow: 'hidden',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: '#303030',
  }),
  '&:focus': {
    borderColor: '#40a9ff',
    backgroundColor: '#e6f7ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#003b57',
      borderColor: '#177ddc',
    }),
  },
  '& span': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  '& svg': {
    fontSize: '12px',
    cursor: 'pointer',
    padding: '4px',
  },
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: '300px',
  margin: '2px 0 0',
  padding: 0,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: '#fff',
  overflow: 'auto',
  maxHeight: '200px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgb(0 0 0 / 0.15)',
  zIndex: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#141414',
  }),
  '& li': {
    padding: '5px 12px',
    display: 'flex',
    '& span': {
      flexGrow: 1,
    },
    '& svg': {
      color: 'transparent',
    },
  },
  "& li[aria-selected='true']": {
    backgroundColor: '#fafafa',
    fontWeight: 600,
    ...theme.applyStyles('dark', {
      backgroundColor: '#2b2b2b',
    }),
    '& svg': {
      color: '#1890ff',
    },
  },
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: '#e6f7ff',
    cursor: 'pointer',
    ...theme.applyStyles('dark', {
      backgroundColor: '#003b57',
    }),
    '& svg': {
      color: 'currentColor',
    },
  },
}));


interface CustomizedHookProps {
  value: OptionType[];
  onChange: (value: OptionType[]) => void;
  options: OptionType[];
  title:string;
}

export default function  CustomizedHook1({ value, onChange, options , title}: CustomizedHookProps) {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: false,
    options: options,
    getOptionLabel: (option) => option.title,
    // value: value,
    onChange: (event, newValue) => {
      onChange(newValue ? [newValue] : []);
    },
    clearOnEscape :true,
  }); 

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag   {...getTagProps({ index })} label={option.title} key={index}/>
          ))}
          <input title={title} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li  {...getOptionProps({ option ,index })} key={index}>
              <span key={index}>{option.title}</span>
              <CheckIcon key={option.title} fontSize="small" />
            </li>
          ))}
        </Listbox>
      )}
    </Root>
  );
}

