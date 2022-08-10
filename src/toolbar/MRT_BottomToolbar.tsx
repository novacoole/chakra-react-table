import React, { FC } from 'react';
import { alpha, Box, Toolbar, useMediaQuery } from '@mui/material';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { commonToolbarStyles } from './MRT_TopToolbar';
import { MRT_TableInstance } from '..';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_BottomToolbar: FC<Props> = ({ table }) => {
  const {
    getState,
    options: {
      enablePagination,
      muiTableBottomToolbarProps,
      positionPagination,
      positionToolbarAlertBanner,
      positionToolbarDropZone,
      renderBottomToolbarCustomActions,
      tableId,
    },
  } = table;
  const { isFullScreen } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTableBottomToolbarProps instanceof Function
      ? muiTableBottomToolbarProps({ table })
      : muiTableBottomToolbarProps;

  const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;

  return (
    <Toolbar
      id={`mrt-${tableId}-toolbar-bottom`}
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          ...commonToolbarStyles({ theme }),
          bottom: isFullScreen ? '0' : undefined,
          boxShadow: `-3px 0 6px ${alpha(theme.palette.common.black, 0.1)}`,
          left: 0,
          position: isFullScreen ? 'fixed' : 'relative',
          right: 0,
          ...(toolbarProps?.sx instanceof Function
            ? toolbarProps.sx(theme)
            : (toolbarProps?.sx as any)),
        } as any)
      }
    >
      <MRT_LinearProgressBar isTopToolbar={false} table={table} />
      {positionToolbarAlertBanner === 'bottom' && (
        <MRT_ToolbarAlertBanner table={table} />
      )}
      {['both', 'bottom'].includes(positionToolbarDropZone ?? '') && (
        <MRT_ToolbarDropZone table={table} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {renderBottomToolbarCustomActions ? (
          <Box sx={{ p: '0.5rem' }}>
            {renderBottomToolbarCustomActions({ table })}
          </Box>
        ) : (
          <span />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: stackAlertBanner ? 'relative' : 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {enablePagination &&
            ['bottom', 'both'].includes(positionPagination ?? '') && (
              <MRT_TablePagination table={table} position="bottom" />
            )}
        </Box>
      </Box>
    </Toolbar>
  );
};