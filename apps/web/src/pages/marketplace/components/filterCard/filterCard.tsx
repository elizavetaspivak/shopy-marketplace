import { Box, Button, Card, createTheme, Flex, Input, MantineProvider } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { ChangeEvent } from 'react';
import classes from './filterCard.module.css';

type FilterCardProps = {
  filterPriceFrom: number | null;
  filterPriceTo: number | null;
  setFilterPriceFrom: React.Dispatch<React.SetStateAction<number | null>>;
  setFilterPriceTo: React.Dispatch<React.SetStateAction<number | null>>;
  setSearch: (value: string | ChangeEvent<any> | null | undefined) => void;
};

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        section: classes.section,
        input: classes.input,
      },
    }),
  },
});

export const FilterCard = ({
  setFilterPriceFrom,
  filterPriceTo,
  setFilterPriceTo,
  filterPriceFrom,
  setSearch,
}: FilterCardProps) => {
  return (
    <Box w="20%">
      <MantineProvider theme={theme}>
        <Card w="315px" h="154px" shadow="sm" padding="xs" radius="md" withBorder>
          <Flex justify="space-between">
            <Box fs={'20px'} fw={'bold'}>
              Filters
            </Box>
            <Box>
              <Button
                variant="transparent"
                color="gray"
                size="xs"
                radius="xs"
                rightSection={<IconX size={14} />}
                onClick={() => {
                  setFilterPriceFrom(null);
                  setFilterPriceTo(null);
                  setSearch('');
                }}
              >
                Reset All
              </Button>
            </Box>
          </Flex>
          <Box mt={'20px'}>
            <Box fs={'16px'} fw={'bold'}>
              Price
            </Box>
            <Flex align="center" justify="space-between">
              <Input
                mt="md"
                radius="md"
                type={'number'}
                value={filterPriceFrom ?? undefined}
                withErrorStyles={false}
                onChange={(e) => {
                  setFilterPriceFrom(+e.target.value);
                }}
                rightSectionPointerEvents="none"
                leftSection={
                  <Box w={'60px'} fz={'13px'}>
                    From:
                  </Box>
                }
                rightSection={
                  <Box w={'60px'} fz={'13px'}>
                    $
                  </Box>
                }
              />
              <Input
                mt="md"
                radius="md"
                type={'number'}
                value={filterPriceTo ?? undefined}
                onChange={(e) => {
                  setFilterPriceTo(+e.target.value);
                }}
                withErrorStyles={false}
                rightSectionPointerEvents="none"
                leftSection={<Box fz={'13px'}>To:</Box>}
                rightSection={
                  <Box w={'60px'} fz={'13px'}>
                    $
                  </Box>
                }
              />
            </Flex>
          </Box>
        </Card>
      </MantineProvider>
    </Box>
  );
};
