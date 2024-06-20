import { Box, Pagination } from '@mantine/core';
import React from 'react';
import classes from './paginationControls.module.css';

type PaginationControlsProps = {
  pagesCount: number | undefined;
  page: number;
  setPage: (page: number) => void;
};

export const PaginationControls = ({ pagesCount, page, setPage }: PaginationControlsProps) => {
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <Box mt={'20px'} mb={'20px'}>
      {pagesCount && pagesCount > 1 && (
        <Pagination
          className={classes.pagination}
          color={'blue'}
          total={pagesCount}
          value={page}
          onChange={handleChangePage}
          mt="sm"
        />
      )}
    </Box>
  );
};
