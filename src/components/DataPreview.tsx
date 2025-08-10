import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";

interface DataPreviewProps {
  headers: string[];
  rows: string[][];
}

export const DataPreview = ({ headers, rows }: DataPreviewProps) => {
  const previewRows = rows.slice(0, 10); // Show first 10 rows

  const detectColumnType = (header: string, rows: string[][]) => {
    const columnIndex = headers.indexOf(header);
    const values = rows.map(row => row[columnIndex]).filter(val => val && val.trim() !== '');
    
    if (values.length === 0) return 'empty';
    
    // Check for dates
    if (header.toLowerCase().includes('date') || header.toLowerCase().includes('time')) {
      return 'date';
    }
    
    // Check for numbers
    if (values.every(val => !isNaN(Number(val)))) {
      return 'number';
    }
    
    // Check for emails
    if (values.some(val => val.includes('@'))) {
      return 'email';
    }
    
    return 'text';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'date': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-purple-100 text-purple-800';
      case 'empty': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-medical-primary" />
          Data Preview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Showing first {previewRows.length} of {rows.length} rows
        </p>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="w-full">
          <div className="min-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => {
                    const type = detectColumnType(header, rows);
                    return (
                      <TableHead key={index} className="font-semibold">
                        <div className="flex flex-col gap-1">
                          <span>{header}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs w-fit ${getTypeColor(type)}`}
                          >
                            {type}
                          </Badge>
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {previewRows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/50">
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="font-mono text-sm">
                        {cell || (
                          <span className="text-muted-foreground italic">empty</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
        
        {rows.length > 10 && (
          <div className="mt-4 text-center">
            <Badge variant="outline" className="text-xs">
              +{rows.length - 10} more rows
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};