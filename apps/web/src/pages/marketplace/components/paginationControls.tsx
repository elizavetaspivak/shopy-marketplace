import { Box, Button, Card, Flex, Input, Pagination } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { undefined } from 'zod';
import React, { ChangeEvent } from 'react';

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
          style={{ width: '10em', marginLeft: 'auto', marginRight: 'auto' }}
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