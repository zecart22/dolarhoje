import { Flex, HStack, Link, Text, useMediaQuery } from "@chakra-ui/react";

import { useLocation } from "react-router-dom";

export const Header = () => {
  const [isLargerThan1281] = useMediaQuery("(min-width: 1281px)");

  const location = useLocation();
  let isHome = true;

  if (location.pathname !== "/") {
    isHome = false;
  }

  return (
    <Flex
      h="72px"
      flexDirection="row"
      justifyContent="space-between"
      px="5"
      py="1"
      bg="primary.main1"
      boxShadow="0px 1px 4px"
      position="fixed"
      left="0px"
      right="0px"
      width="100%"
      zIndex="100"
      alignItems="center"
    >
      {isLargerThan1281 ? (
        <>
          <Flex alignItems="center" color="primary.main">
            <HStack spacing="5">
              <Text as="button" _hover={{ transform: "translateY(-4px)" }}>
                {isHome ? (
                  <Link href="#">INICIO</Link>
                ) : (
                  <Link href="/">INICIO</Link>
                )}
              </Text>
              <Text as="button" _hover={{ transform: "translateY(-4px)" }}>
                {isHome ? (
                  <Link color="destak.main" href="https://bit.ly/3I4Q6WR">
                    PORTFÓLIO
                  </Link>
                ) : (
                  <Link color="destak.main" href="https://bit.ly/3I4Q6WR">
                    PORTFÓLIO
                  </Link>
                )}
              </Text>
              <Text as="button" _hover={{ transform: "translateY(-4px)" }}>
                {isHome ? (
                  <Link
                    href="https://www.linkedin.com/in/robertpupo/"
                    isExternal
                  >
                    CONTATO
                  </Link>
                ) : (
                  <Link
                    href="https://www.linkedin.com/in/robertpupo/"
                    isExternal
                  >
                    CONTATO
                  </Link>
                )}
              </Text>
            </HStack>
          </Flex>
        </>
      ) : (
        <>
          <Flex>
            <Text
              color="primary.main"
              fontSize="19px"
              fontFamily="Monoton"
              as="button"
              ml="35px"
              _hover={{ transform: "translateY(-4px)" }}
            >
              <HStack spacing="15px">
                <Link href="https://github.com/zecart22">GIT HUB</Link>
                <Link href="https://bit.ly/3I4Q6WR">PORTFÓLIO</Link>

                <Link href="https://www.linkedin.com/in/robertpupo/">
                  CONTATO
                </Link>
              </HStack>
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};
