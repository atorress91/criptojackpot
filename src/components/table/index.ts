export interface TableColumn {
    key: string;
    header: string;
}

export interface TableRow {
    [key: string]: any;
}

export interface TableProps {
    columns: TableColumn[];
    data: TableRow[];
}