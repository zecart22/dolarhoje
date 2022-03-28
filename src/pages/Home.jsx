import {
  Box,
  Center,
  Flex,
  HStack,
  VStack,
  Image,
  Input,
  Text,
  Stack,
  InputGroup,
  InputLeftAddon,
  Heading,
  useMediaQuery,
  Select,
  Button,
} from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Grafico } from "../components/Graphics";
import lery from "../assets/img/lery3.png";
import lary_pc from "../assets/img/lery_pc.png";
import dollar from "../assets/img/dollar2.png";
import { api } from "../service";
import { useEffect, useState } from "react";
import { Waves } from "../components/Waves";

export const Home = () => {
  const data = [
    { pair: "USD-BRL", title: "Dólar Americano/Real Brasileiro" },
    { pair: "EUR-USD", title: "Euro/Dólar Americano" },
    { pair: "USD-PLN", title: "Dólar Americano/Zlóti Polonês" },
    { pair: "USD-BND", title: "Dólar Americano/Dólar de Brunei" },
    { pair: "USD-HRK", title: "Dólar Americano/Kuna Croata" },
    { pair: "USD-SZL", title: "Dólar Americano/Lilangeni Suazilandês" },
    { pair: "USD-TJS", title: "Dólar Americano/Somoni do Tajiquistão" },
    { pair: "USD-RUB", title: "Dólar Americano/Rublo Russo" },
    { pair: "USD-ZAR", title: "Dólar Americano/Rand Sul-Africano" },
    { pair: "USD-SEK", title: "Dólar Americano/Coroa Sueca" },
    { pair: "USD-GMD", title: "Dólar Americano/Dalasi da Gâmbia" },
    { pair: "USD-MAD", title: "Dólar Americano/Dirham Marroquino" },
    { pair: "USD-RSD", title: "Dólar Americano/Dinar Sérvio" },
  ];

  const [isLargerThan1281] = useMediaQuery("(min-width: 1281px)");

  const [dolarQtd, setDolarQtd] = useState(0);

  const [curPair, setCurPair] = useState("");

  const [anotherCur, setAnotherCur] = useState(0);

  const [days, setDays] = useState(8);

  const [dataDays, setDataDays] = useState([]);

  const [colorBorderButton, setColorBorderButton] = useState("");

  const [secondClick, setSecondCLick] = useState(false);

  const [counter, setCounter] = useState(1);

  const [currentObj, setCurrentObj] = useState([
    {
      EURUSD: {
        high: "1.1119",
      },
    },
  ]);

  /*  pegando o nome do par selecionado */

  const TakeCurPair = (pair = "USD-BRL") => {
    setCurPair(pair);
  };

  /* fazendo requisição da Api de acordo com o nome do par */
  /*   pegando o valor das moedas hoje */

  const TakePrices = (curPair) => {
    api
      .get("/last/" + curPair)
      .then((response) => {
        console.log(response);
        setCurrentObj(response.data);
      })
      .catch((err) => console.log(err));
  };

  /* fazendo requisição da Api para pegar o histórico 
da movimentação do par de moedas */

  const TakePricesTimeCourse = (curPair, days) => {
    api
      .get("/json/daily/" + curPair + "/" + days)
      .then((response) => {
        console.log(response);
        setDataDays(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    TakeCurPair();
    TakePrices(curPair);
    TakePricesTimeCourse(curPair, days);
  }, []);

  /* pegando o preço do dolar  */

  const n = Object.keys(currentObj);
  const newDolar = n[0];
  const priceDollar = currentObj[newDolar]["low"];

  /* preço do dolar */
  const dolar = Number(priceDollar).toFixed(2);

  /*  preço da outra moeda */

  const calculateAnotherCur = () => {
    const price = (Number(dolarQtd) * dolar).toFixed(2);
    setAnotherCur(price);
  };

  const ClicksCount = () => {
    setCounter(counter + 1);
    if (counter === 2) {
      setSecondCLick(true);
      setCounter(1);
    }
  };

  console.log(secondClick);

  return (
    <>
      {isLargerThan1281 ? (
        <>
          <Box width="52vw" position={"relative"} alignContent="center">
            <VStack spacing="-150px">
              <Header />

              <Flex
                flexDirection="row"
                position="relative"
                top="200px"
                left="-10px"
              >
                <Image w="760px" h="730px" src={lary_pc} />
                <HStack spacing="80px">
                  <Center
                    flexDirection="column"
                    ml="-100px"
                    mt="-170px"
                    w="580px"
                  >
                    <VStack spacing="30px">
                      <Heading
                        fontSize={["20px", "30px", "48px"]}
                        fontFamily="bodySecondary"
                        fontWeight="400"
                      >
                        DÓLAR HOJE
                      </Heading>
                      <Image src={dollar} w="470px" />

                      <VStack spacing="10px">
                        <Box as="span" w="480px">
                          <Box>
                            <Select
                              variant="filled"
                              placeholder="Selecione as moedas"
                              onChange={(e) => (
                                TakeCurPair(e.target.value),
                                TakePricesTimeCourse(e.target.value, days),
                                setAnotherCur(0),
                                setColorBorderButton("secondary.main"),
                                setCounter(1),
                                setSecondCLick(false)
                              )}
                            >
                              {data &&
                                data.map((pair) => (
                                  <option value={pair.pair}>
                                    {pair.title}
                                  </option>
                                ))}
                            </Select>
                          </Box>

                          <Box h="10px"></Box>
                          <InputGroup>
                            <InputLeftAddon
                              children="U$$"
                              h="58px"
                              w="90px"
                              opacity="90%"
                              boxShadow="lg"
                              borderRadius="5px"
                            />
                            <Input
                              textAlign="start"
                              type="number"
                              fontSize="3xl"
                              w="395px"
                              h="58px"
                              opacity="90%"
                              boxShadow="lg"
                              borderRadius="5px"
                              bg="green.25"
                              value={dolarQtd}
                              name="dolarQtd"
                              onChange={(e) => setDolarQtd(e.target.value)}
                              onClick={() =>
                                setColorBorderButton("secondary.main")
                              }
                            ></Input>

                            <Button
                              onClick={() => (
                                TakePrices(curPair),
                                calculateAnotherCur(),
                                setColorBorderButton(""),
                                ClicksCount()
                              )}
                              borderColor={colorBorderButton}
                              ml="10px"
                              colorScheme="teal"
                              variant="outline"
                              size="lg"
                              boxShadow="lg"
                              borderRadius="5px"
                            >
                              Calcular
                            </Button>
                          </InputGroup>
                          <Box h="10px"></Box>
                          <InputGroup size="sm">
                            <InputLeftAddon
                              w="90px"
                              children={curPair}
                              h="58px"
                              opacity="90%"
                              boxShadow="lg"
                              borderRadius="5px"
                            />
                            <Input
                              as="box"
                              fontSize="3xl"
                              w="395px"
                              h="58px"
                              opacity="60%"
                              boxShadow="lg"
                              borderRadius="5px"
                              bg="green.25"
                            ></Input>
                            <Text fontSize="3xl" ml="-378px" mt="20px">
                              {secondClick ? (
                                <>{anotherCur}</>
                              ) : (
                                <Text fontSize={"15px"}>
                                  de um clique duplo em calcular para atualizar
                                  o valor
                                </Text>
                              )}
                            </Text>
                          </InputGroup>
                        </Box>
                      </VStack>
                    </VStack>
                  </Center>

                  <Box
                    w="700px"
                    h="710px"
                    bgGradient="linear(to-r, green.200, primary.main2)"
                    boxShadow="dark-lg"
                    borderRadius={20}
                    _hover={{ transform: "translateY(-4px)" }}
                  >
                    <Heading mt={"45px"} ml={"65px"}>
                      Gráfico de 7 dias do par {curPair}
                    </Heading>
                    <Grafico data={dataDays} days={days} />
                  </Box>
                </HStack>
              </Flex>
            </VStack>
            <Waves />
          </Box>
        </>
      ) : (
        /* mobile */
        <>
          <Box
            width="45vw"
            alignItems={"center"}
            ml="95px"
            justifyContent={"center"}
          >
            <VStack spacing="-150px">
              <Header />

              <Flex
                flexDirection="column"
                position="relative"
                top="250px"
                left="0px"
              >
                <HStack>
                  <Center flexDirection="column" alignItems={"center"}>
                    <VStack spacing="20px">
                      <Heading
                        fontSize={["20px", "30px", "48px"]}
                        fontFamily="bodySecondary"
                        fontWeight="400"
                      >
                        DÓLAR HOJE
                      </Heading>
                      <Image src={dollar} w="320px" />

                      <Stack spacing={4}>
                        <Box as="span" w="320px">
                          <Box mb="20px">
                            <Select
                              variant="filled"
                              placeholder="Selecione as moedas"
                              onChange={(e) => (
                                TakeCurPair(e.target.value),
                                TakePricesTimeCourse(e.target.value, days),
                                setAnotherCur(0),
                                setColorBorderButton("secondary.main"),
                                setCounter(1),
                                setSecondCLick(false)
                              )}
                            >
                              {data &&
                                data.map((pair) => (
                                  <option value={pair.pair}>
                                    {pair.title}
                                  </option>
                                ))}
                            </Select>
                          </Box>

                          <InputGroup>
                            <InputLeftAddon
                              children="U$$"
                              h="58px"
                              w="90px"
                              opacity="90%"
                              boxShadow="lg"
                              borderRadius="5px"
                            />
                            <Input
                              fontSize="3xl"
                              w="230px"
                              h="58px"
                              opacity="60%"
                              boxShadow="lg"
                              borderRadius="5px"
                              bg="green.25"
                              value={dolarQtd}
                              name="dolarQtd"
                              type={"number"}
                              onChange={(e) => setDolarQtd(e.target.value)}
                              onClick={() =>
                                setColorBorderButton("secondary.main")
                              }
                            ></Input>
                            <Button
                              onClick={() => (
                                TakePrices(curPair),
                                calculateAnotherCur(),
                                setColorBorderButton(""),
                                ClicksCount()
                              )}
                              borderColor={colorBorderButton}
                              ml="10px"
                              colorScheme="teal"
                              variant="outline"
                              size="lg"
                              boxShadow="lg"
                              borderRadius="5px"
                            >
                              Calcular
                            </Button>
                          </InputGroup>
                        </Box>
                        <Box as="span">
                          <InputGroup size="sm">
                            <InputLeftAddon
                              w="90px"
                              children={curPair}
                              h="70px"
                              opacity="90%"
                              boxShadow="lg"
                              borderRadius="5px"
                            />
                            <Input
                              as="box"
                              type={"number"}
                              w="230px"
                              h="70px"
                              opacity="60%"
                              fontSize="3xl"
                              boxShadow="lg"
                              borderRadius="5px"
                              bg="green.25"
                            ></Input>
                            <Text fontSize="3xl" ml="-220px" mt="20px">
                              {secondClick ? (
                                <>{anotherCur}</>
                              ) : (
                                <Text fontSize={"10px"}>
                                  de um clique duplo em calcular para atualizar
                                  o valor
                                </Text>
                              )}
                            </Text>
                          </InputGroup>
                        </Box>
                      </Stack>
                    </VStack>
                    <VStack spacing="-58px" justifyContent="column" mb="15px">
                      <Image w="460px" h="380px" src={lery} />
                      <Box
                        bgGradient="linear(to-r, green.200, primary.main2)"
                        boxShadow="dark-lg"
                        borderRadius={10}
                      >
                        <Heading mt={"25px"} ml={"65px"} fontSize="18px">
                          Grafico de 7 dias do par {curPair}
                        </Heading>
                        <Grafico data={dataDays} days={days} />
                      </Box>
                    </VStack>
                  </Center>
                </HStack>
              </Flex>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};
