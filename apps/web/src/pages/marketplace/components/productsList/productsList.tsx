import { Box, Grid, Skeleton } from '@mantine/core';
import React, { memo } from 'react';
import { SortDirection } from '@tanstack/react-table';
import { ListResult } from '../../../../types';
import { ProductResponce } from '../../../../resources/product/product.api';
import { SortByNewest } from './sortByNewest';
import { Product } from './product';

type ProductsListProps = {
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<SortDirection>>;
  isProductListLoading: boolean;
  products: ListResult<ProductResponce> | undefined;
  filterPriceFrom: number | null;
  filterPriceTo: number | null;
  setFilterPriceFrom: React.Dispatch<React.SetStateAction<number | null>>;
  setFilterPriceTo: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ProductsList = memo(
  ({
    sorting,
    setSorting,
    isProductListLoading,
    products,
    setFilterPriceTo,
    setFilterPriceFrom,
    filterPriceFrom,
    filterPriceTo,
  }: ProductsListProps) => {
    return (
      <Box>
        <SortByNewest
          setSorting={setSorting}
          sorting={sorting}
          setFilterPriceFrom={setFilterPriceFrom}
          setFilterPriceTo={setFilterPriceTo}
          products={products}
          filterPriceFrom={filterPriceFrom}
          filterPriceTo={filterPriceTo}
        />
        {isProductListLoading && (
          <>
            {[1, 2, 3].map((item) => (
              <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
            ))}
          </>
        )}
        <Grid gutter="xs" justify="flex-start" align="flex-start">
          {products?.results?.map((p) => <Product product={p} key={p._id} />)}
        </Grid>
      </Box>
    );
  },
);

ProductsList.displayName = 'ProductsList';
