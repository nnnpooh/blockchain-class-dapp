import { FC, useState } from "react";
import { Container, Input, Button, Loader } from "@mantine/core";
import { useWorkingStore } from "@src/utils/stores";

const Body: FC = () => {
  // const [secret, setSecret] = useState("My Super Secret");
  const [secret, setSecret] = useWorkingStore((state) => [
    state.secret,
    state.setSecret,
  ]);
  const [text, setText] = useState("");

  return (
    <Container size="xl">
      <div className="flex h-40 flex-col items-center justify-center gap-3 rounded-lg bg-sky-600">
        <span className="text-lg italic text-white">My secret is ...</span>
        <span className="text-4xl font-bold text-white">{secret}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 self-center rounded-lg border p-3">
        <Input onChange={(e) => setText(e.target.value)} className="w-80" />
        <Button
          onClick={() => {
            setSecret(text);
          }}
          className="bg-sky-600 hover:bg-sky-700"
        >
          Change Secret
        </Button>
      </div>
    </Container>
  );
};

export default Body;
