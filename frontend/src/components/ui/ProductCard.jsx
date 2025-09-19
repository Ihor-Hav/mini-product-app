import { Button, CloseButton, Box, Image, Heading, Text, HStack, IconButton, Portal, VStack, Input } from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, {useState} from 'react';
import { useColorModeValue } from './color-mode';
import { useProductStore } from '../../store/product';
import { Toaster, toaster } from "@/components/ui/toaster"
import { Dialog } from "@chakra-ui/react"


const ProductCard = ({product}) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {deleteProduct, updateProduct} = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if (!success) {
            toaster.create({
              title: "Couldn't create the product",
              description: message,
              type: "error",
            })
        }else{
            toaster.create({
              title: "Successfully created",
              description: message,
              type: "success",
        })}
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } =  await updateProduct(pid, updatedProduct);
        if (!success) {
            toaster.create({
              title: "Couldn't create the product",
              description: message,
              type: "error",
            })
        }else{
            toaster.create({
              title: "Successfully created",
              description: "Product updated successfully",
              type: "success",
        })}
    }

  return (
    <Box 
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{transform: "translateY(-5px)", shadow: 'xl'}}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Toaster />
        <Box
            p={4}
        >
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <HStack wrap="wrap" gap="4">

                    <Dialog.Root
                        placement={"center"}
                        motionPreset="slide-in-bottom"
                    >
                        <Dialog.Trigger asChild>
                            <IconButton aria-label='Edit' bg='blue.400'>
                                <FaEdit />
                            </IconButton>
                        </Dialog.Trigger>
                        <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Update Product</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack spacing={4}>
                                    <Input placeholder='Product Name' name='name' value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                                    <Input placeholder='Product Price' name='price' value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}/>
                                    <Input placeholder='Product Image' name='image' value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}/>
                                </VStack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Dialog.ActionTrigger asChild>
                                <Button onClick={(pid) => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                </HStack>
                <IconButton aria-label='Edit' bg='red.500' onClick={() => handleDeleteProduct(product._id)}>
                    <MdDelete />
                </IconButton>
            </HStack>
        </Box>


    </Box>
  )
}

export default ProductCard