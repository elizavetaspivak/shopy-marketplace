import React, { useLayoutEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Flex } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';

import { ListParams, SortOrder } from 'types';
import { productApi } from '../../resources/product';
import { FilterCard } from './components/filterCard';
import { ProductsList } from './components/productsList/productsList';
import { PaginationControls } from './components/paginationControls';
import { SearchProducts } from './components/searchProducts';
import { SortDirection } from '@tanstack/react-table';
import { PER_PAGE } from './constants';

type FilterParams = {
  price?: {
    from: number;
    to: number;
  };
};

type SortParams = {
  createdOn?: SortOrder;
};

export type ProductsListParams = ListParams<FilterParams, SortParams>;

const Marketplace: NextPage = () => {
  const [search, setSearch] = useInputState<string>('');
  const [page, setPage] = useState<number>(1);
  const [filterPriceFrom, setFilterPriceFrom] = useState<number | null>(null);
  const [filterPriceTo, setFilterPriceTo] = useState<number | null>(null);

  const [params, setParams] = useState<ProductsListParams>({
    page: 1,
    perPage: 5,
  });

  const [sorting, setSorting] = useState<SortDirection>('asc');

  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: products, isLoading: isProductListLoading } = productApi.useGetProducts({ ...params });

  useLayoutEffect(() => {
    if (!filterPriceFrom) {
      setParams((prev) => ({
        ...prev,
        filter: {},
      }));
    }

    if (filterPriceTo) {
      setParams((prev) => ({
        ...prev,
        filter: { price: { from: +filterPriceFrom!, to: +filterPriceTo } },
      }));
    }
  }, [filterPriceFrom, filterPriceTo]);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page, perPage: PER_PAGE }));
  }, [page]);

  useLayoutEffect(() => {
    setParams((prev) => ({
      ...prev,
      sort: sorting === 'asc' ? { createdOn: 'asc' } : { createdOn: 'desc' },
    }));
  }, [sorting]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>

      <Flex justify="space-between">
        <FilterCard
          setSearch={setSearch}
          filterPriceTo={filterPriceTo}
          filterPriceFrom={filterPriceFrom}
          setFilterPriceFrom={setFilterPriceFrom}
          setFilterPriceTo={setFilterPriceTo}
        />
        <Box w="75%">
          <SearchProducts setSearch={setSearch} search={search} isProductListLoading={isProductListLoading} />
          <ProductsList
            sorting={sorting}
            setSorting={setSorting}
            products={products}
            filterPriceFrom={filterPriceFrom}
            filterPriceTo={filterPriceTo}
            isProductListLoading={isProductListLoading}
            setFilterPriceTo={setFilterPriceTo}
            setFilterPriceFrom={setFilterPriceFrom}
          />
          <PaginationControls page={page} pagesCount={products?.pagesCount} setPage={setPage} />
        </Box>
      </Flex>
    </>
  );
};

export default Marketplace;
