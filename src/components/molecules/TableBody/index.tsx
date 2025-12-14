import React from 'react';
import { Paper, Table, TableData, TableProps, Pagination, Stack, Group, Text, Select, UnstyledButton, Center } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';

export interface SortConfig {
  [columnIndex: number]: string; // Maps column index to API field name
}

interface Props extends Omit<TableProps, 'data'> {
  tableData: TableData;
  page?: number;
  total?: number;
  limit?: number;
  totalRecords?: number;
  onPageChange?: (page: number, limit?: number) => void;
  onLimitChange?: (limit: number) => void;
  sortableColumns?: SortConfig;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  onSort?: (sortBy: string, sortOrder: 'ASC' | 'DESC') => void;
}

const LIMIT_OPTIONS = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

function Th({ children, sortable, sorted, onSort }: { children: React.ReactNode; sortable?: boolean; sorted?: 'ASC' | 'DESC' | null; onSort?: () => void }) {
  const Icon = sorted === 'ASC' ? IconChevronUp : sorted === 'DESC' ? IconChevronDown : IconSelector;
  
  if (!sortable) {
    return <Table.Th>{children}</Table.Th>;
  }

  return (
    <Table.Th>
      <UnstyledButton onClick={onSort} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{children}</span>
        <Center>
          <Icon size={16} style={{ opacity: sorted ? 1 : 0.3 }} />
        </Center>
      </UnstyledButton>
    </Table.Th>
  );
}

export default function TableBody({
  tableData,
  page = 1,
  total = 1,
  limit = 10,
  totalRecords,
  onPageChange,
  onLimitChange,
  sortableColumns,
  sortBy,
  sortOrder,
  onSort,
  ...props
}: Props) {
  const pagination = usePagination({
    total,
    page,
    onChange: (newPage) => {
      if (onPageChange) {
        onPageChange(newPage, limit);
      }
    },
  });

  // Calculate the range of items being shown
  const startItem = totalRecords ? (page - 1) * limit + 1 : 0;
  const endItem = totalRecords ? Math.min(page * limit, totalRecords) : 0;

  const handleLimitChange = (value: string | null) => {
    if (value) {
      const newLimit = Number(value);
      // If onLimitChange is provided, use it
      if (onLimitChange) {
        onLimitChange(newLimit);
        // Reset to page 1 when limit changes
        if (onPageChange) {
          onPageChange(1);
        }
      } else if (onPageChange) {
        // Default behavior: call onPageChange with page 1 and new limit
        onPageChange(1, newLimit);
      }
    }
  };

  const handleSort = (columnIndex: number) => {
    if (!sortableColumns || !onSort) return;
    
    const fieldName = sortableColumns[columnIndex];
    if (!fieldName) return;

    // Toggle sort order: ASC -> DESC -> ASC
    if (sortBy === fieldName) {
      const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
      onSort(fieldName, newOrder);
    } else {
      // New column, start with ASC
      onSort(fieldName, 'ASC');
    }
  };

  const getSortState = (columnIndex: number): 'ASC' | 'DESC' | null => {
    if (!sortableColumns || !sortBy) return null;
    const fieldName = sortableColumns[columnIndex];
    if (sortBy === fieldName) {
      return sortOrder || null;
    }
    return null;
  };

  // If sortable columns are provided, render custom table with sortable headers
  const renderSortableTable = () => {
    if (!sortableColumns || !tableData.head || !tableData.body) {
      return <Table data={tableData} highlightOnHover {...props} />;
    }

    return (
      <Table highlightOnHover {...props}>
        <Table.Thead>
          <Table.Tr>
            {tableData.head.map((header, index) => {
              const fieldName = sortableColumns[index];
              const sorted = getSortState(index);
              return (
                <Th
                  key={index}
                  sortable={!!fieldName}
                  sorted={sorted}
                  onSort={() => handleSort(index)}
                >
                  {header}
                </Th>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tableData.body.map((row, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Table.Td key={cellIndex}>{cell}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  };

  return (
    <Stack gap="sm">
      <Paper p="sm" shadow="md" w="100%">
        {renderSortableTable()}
      </Paper>
      {(total > 1 || totalRecords) && (
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Left: Limit Selector */}
          <Group gap="xs" align="center">
            <Text size="sm" c="dimmed">
              Show:
            </Text>
            <Select
              value={limit.toString()}
              onChange={handleLimitChange}
              data={LIMIT_OPTIONS}
              style={{ width: 80 }}
              size="sm"
            />
            <Text size="sm" c="dimmed">
              entries
            </Text>
          </Group>

          {/* Center: Total Records Information */}
          <Text size="sm" c="dimmed" style={{ flex: 1, textAlign: 'center' }}>
            Showing {startItem} to {endItem} of {totalRecords} entries
          </Text>

          {/* Right: Pagination */}
          <Pagination
            radius="md"
            value={pagination.active}
            onChange={pagination.setPage}
            total={total}
            siblings={1}
            boundaries={1}
          />
        </Group>
      )}
    </Stack>
  );
}
