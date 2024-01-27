import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
const actions = [
 { icon: <FileCopyIcon />, name: 'Copy' },
 { icon: <SaveIcon />, name: 'Save' },
 { icon: <PrintIcon />, name: 'Print' },
 { icon: <ShareIcon />, name: 'Share' },
];

export default function UserOption({ user }) {
 return (
  <SpeedDial
   ariaLabel="SpeedDial basic example"
   direction='down'
   sx={{ position: 'absolute', top: 16, right: 16 }}
   icon={<img src={user.avatar.post_url} alt='' />}
  >
   {actions.map((action) => (
    <SpeedDialAction
     key={action.name}
     icon={action.icon}
     tooltipTitle={action.name}
    />
   ))}
  </SpeedDial>
 );
}
