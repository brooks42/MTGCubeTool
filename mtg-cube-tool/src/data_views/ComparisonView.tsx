import { Box, Center, HStack, Spacer, Text, VStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import * as React from 'react'

export function ComparisonView() {

    return (
        <Center>
            <Box bgColor="gray.500" p={4} m={4} width="50%">
                <VStack>
                    <Text>
                        Comparison tool
                    </Text>
                    <HStack width="100%">
                        <Select>
                            <option value="KDH">Kaldheim</option>
                        </Select>
                        <Spacer />
                        <Select>
                            <option value="STX">Strixhaven</option>
                        </Select>
                    </HStack>
                </VStack>
            </Box>
        </Center>)
}