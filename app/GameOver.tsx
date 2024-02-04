"use client";

import {
  AlertDialog,
  Button,
  Flex,
  Inset,
  Table,
  TableBody,
} from "@radix-ui/themes";

interface Props {
  mistake: number;
  WPM: number;
  CPM: number;
  open: boolean;
  setOpen: (str: boolean) => void;
  reset: () => void;
}

const GameOver = ({ mistake, WPM, CPM, open, setOpen, reset }: Props) => {
  const RestartGame = () => {
    reset();
    setOpen(false);
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger />
      <AlertDialog.Content className="!max-w-sm !bg-[--accent-9] !text-white">
        <AlertDialog.Title>Game Over 😢</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Times Up! You had a score of
        </AlertDialog.Description>

        <Inset side="x" my="5">
          <Table.Root>
            <Table.Header>
              <Table.Row className="font-bold">
                <Table.ColumnHeaderCell>Mistakes</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>WPM</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>CPM</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <TableBody>
              <Table.Row className="font-bold">
                <Table.RowHeaderCell className="!font-bold">
                  {mistake}
                </Table.RowHeaderCell>
                <Table.Cell>{WPM}</Table.Cell>
                <Table.Cell>{CPM}</Table.Cell>
              </Table.Row>
            </TableBody>
          </Table.Root>
        </Inset>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button variant="surface" onClick={RestartGame}>
              Restart
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default GameOver;
