import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  summary: React.ReactNode;
  goToProduct?: () => void;
}

export const Product = ({
  title,
  summary,
  goToProduct,
}: Props) => {
  return (
    <Card
      onClick={goToProduct}
      cursor={goToProduct ? 'pointer' : 'auto'}
    >
      <CardHeader>
        <Heading size='md'>
          {title}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Summary
            </Heading>
            <Text pt='2' fontSize='sm'>
              {summary}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};