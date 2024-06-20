import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { Box, Button, FileInput, Flex, Image, rem, Stack, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { productApi } from '../../../resources/product';
import { handleError } from '../../../utils';
import { CreateProductIcon } from '../../components/icons/createProductIcon';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { log } from 'next/dist/server/typescript/utils';

const schema = z.object({
  file: z.any(),
  title: z.string().min(1, 'Title is required'),
  price: z.number().int().positive(),
});

type CreateNewProductParams = z.infer<typeof schema>;

const CreateProduct: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateNewProductParams>({
    resolver: zodResolver(schema),
    defaultValues: { file: undefined, price: undefined },
  });

  const { mutate: createNewProduct, isPending: isCreateNewProductPending, isSuccess } = productApi.useCreateProduct();

  const onSubmit = (data: CreateNewProductParams) => {
    if (!file) {
      setError('file', { message: 'No file uploaded' });
      return;
    }

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('file', file);

    createNewProduct(formData, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <>
      <Head>
        <title>Create Products</title>
      </Head>

      <Stack gap="lg" w="55%">
        <Title order={2}>Create new product</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={20}>
            <Flex align="center">
              {file ? (
                <Box w="180px" h="180px">
                  <Image
                    style={{ borderRadius: '20px' }}
                    w="180px"
                    h="180px"
                    fit="cover"
                    src={URL.createObjectURL(file)}
                  />
                </Box>
              ) : (
                <CreateProductIcon />
              )}
              <FileInput
                {...register('file')}
                id="picture"
                pl="16px"
                multiple={false}
                onChange={(image) => setFile(image)}
                accept="image/png,image/jpeg"
                placeholder="Upload photo"
              />
            </Flex>

            <TextInput
              {...register('title')}
              label="Title of the product"
              pt="5px"
              withErrorStyles={false}
              placeholder="Enter title of the product"
              error={errors.title?.message}
              radius="md"
              w="100%"
            />

            <TextInput
              {...register('price', { valueAsNumber: true })}
              label="Price"
              pt="5px"
              w="100%"
              withErrorStyles={false}
              type="number"
              placeholder="Enter price of the product"
              error={errors.price?.message}
              radius="md"
            />
          </Stack>

          <Button
            style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto' }}
            type="submit"
            mt="28px"
            w="21%"
            bg="#2B77EB"
            loading={isCreateNewProductPending}
            variant="filled"
          >
            Upload Product
          </Button>
        </form>
      </Stack>
    </>
  );
};
export default CreateProduct;
