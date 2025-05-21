"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { SnackBarType } from '../lib/definitions';

function MyApp({message}: {message : SnackBarType}) {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    enqueueSnackbar(message);
  }, []);

 

  return (
    <React.Fragment>
    </React.Fragment>
  );
  // return ; {message :'success' , {variant:'error'}}
}

export default function IntegrationNotistack(snackbar : SnackBarType) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp message={snackbar}/>
    </SnackbarProvider>
  );
}
