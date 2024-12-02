import { Paper, Table, TableData, TableProps } from '@mantine/core';

interface Props extends TableProps {
  tableData: TableData;
}

export default function TableBody({ tableData, ...props }: Props) {
  return (
    <Paper p="sm" shadow="md" w="100%">
      <Table data={tableData} highlightOnHover {...props} />
    </Paper>
  );
}
