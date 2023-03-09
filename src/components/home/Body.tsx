import { FC, useState } from "react";
import { useContract } from "./useContract";
import { useWorkingStore } from "@src/utils/stores";
import { Container, Input, Button, Loader } from "@mantine/core";
import {
  IconFileBroken,
  IconSignature,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { contractAddress } from "@src/abi/secret";
const Body: FC = () => {
  const { writeSecret, isLoading, isError } = useContract();
  const [text, setText] = useState("");

  const link = `https://goerli.etherscan.io/address/${contractAddress}`;
  return (
    <Container size="xl" className="flex flex-col gap-2">
      <div className="relative flex h-40 flex-col items-center justify-center gap-3 rounded-lg bg-sky-600">
        <div className="absolute top-1 right-1">
          <Link href={link} target="_blank" passHref={true}>
            <IconExternalLink size={20} className="text-white" />
          </Link>
        </div>
        <span className="text-lg italic text-white">My secret is ...</span>
        <Secret isError={isError} isLoading={isLoading} />
        <div className="flex items-center gap-2 text-sm  text-sky-200">
          <IconSignature size={20} />
          <span className="italic">ชื่อ นามสกุล รหัส</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 self-center rounded-lg border p-3">
        <Input
          onChange={(e) => setText(e.target.value)}
          className="w-80"
          disabled={isLoading || isError}
        />
        <Button
          onClick={() => {
            void writeSecret(text);
          }}
          className="bg-sky-600 hover:bg-sky-700"
          disabled={isLoading || isError}
        >
          Change Secret
        </Button>
      </div>
    </Container>
  );
};

export default Body;

interface Props {
  isLoading: boolean;
  isError: boolean;
}
const Secret: FC<Props> = ({ isLoading, isError }) => {
  const [secret] = useWorkingStore((state) => [state.secret]);

  if (isLoading) return <Loader />;
  if (isError) return <IconFileBroken size={50} className="text-white" />;

  return <span className="text-4xl font-bold text-white">{secret}</span>;
};
