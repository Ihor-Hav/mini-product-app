import { Container, VStack, Box, Heading, Button, Input } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"
import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
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
        })
    }
    setNewProduct({name: "", price: "", image: ""})
  }
  
  return (
    <Container maxW={"container.sm"}>
      <Toaster />
        <VStack spacing={8}>

          <Heading as={"h1"} fontSize={"30px"} textAlign={"center"} my={8}
            fontWeight={"bold"}
            bgGradient="to-r" 
            gradientFrom="cyan.400" 
            gradientTo="blue.500"
            bgClip="text">
              Create New Product
          </Heading>

          <Box w={"full"} bg={useColorModeValue("white", "gray-800")} p={6} rounded={"lg"} shadow={"md"}>
            <VStack spacing={4}>
              <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
              <Input placeholder='Product Price' name='price' value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
              <Input placeholder='Product Image' name='image' value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>

              <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add Product</Button>
            </VStack>
          </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage