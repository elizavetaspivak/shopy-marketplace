import { ActionIcon, Box, Flex, Pill, Stack } from '@mantine/core';
import { SortIcon } from '../../../components/icons/sortIcon';
import { SortArrowIcon } from '../../../components/icons/sortArrowIcon';
import React from 'react';
import { ListResult } from '../../../../types';
import { ProductResponce } from '../../../../resources/product/product.api';
import { SortDirection } from '@tanstack/react-table';
import s from './sortByNewest.module.css';

type SortByNewestProps = {
  products: ListResult<ProductResponce> | undefined;
  filterPriceFrom: number | null;
  filterPriceTo: number | null;
  setFilterPriceFrom: React.Dispatch<React.SetStateAction<number | null>>;
  setFilterPriceTo: React.Dispatch<React.SetStateAction<number | null>>;
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<SortDirection>>;
};

export const SortByNewest = ({
  products,
  filterPriceFrom,
  filterPriceTo,
  setFilterPriceFrom,
  setFilterPriceTo,
  sorting,
  setSorting,
}: SortByNewestProps) => {
  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Box fw={'bold'}>{products?.count} results</Box>

        <Stack>
          <Flex justify="start">
            <Box w="20px" mr={'5px'}>
              <SortIcon />
            </Box>
            <Box>Sort by newest</Box>
            <ActionIcon
              variant="transparent"
              color="gray"
              aria-label="Settings"
              onClick={() => {
                sorting === 'asc' ? setSorting('desc') : setSorting('asc');
              }}
            >
              <Box w="16px">
                <SortArrowIcon />
              </Box>
            </ActionIcon>
          </Flex>
        </Stack>
      </Flex>
      <Box mt={'15px'}>
        {filterPriceFrom && filterPriceTo && (
          <Box mb={'20px'}>
            <Pill
              size="lg"
              classNames={{
                root: s.root,
                remove: s.remove,
              }}
              withRemoveButton
              onRemove={() => {
                setFilterPriceFrom(null);
                setFilterPriceTo(null);
              }}
            >
              ${filterPriceFrom}-${filterPriceTo}
            </Pill>
          </Box>
        )}
      </Box>
    </Box>
  );
};
