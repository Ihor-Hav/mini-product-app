import React from 'react'
import { Container, Flex, Text, Button, HStack } from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { FaRegSquarePlus } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'container.xl'} px="4" bg={useColorModeValue("white", "gray.950")}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r" 
          gradientFrom="cyan.400" 
          gradientTo="blue.500"
          bgClip="text"
        >
          <Link to="/" >Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button>
              <FaRegSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
