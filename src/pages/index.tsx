import { type NextPage } from "next";
import { Container } from "@mantine/core";
import { IconShieldLock } from "@tabler/icons-react";
const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 py-4">
      <Container>
        <IconShieldLock />
      </Container>
    </div>
  );
};

export default Home;
