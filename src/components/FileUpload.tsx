import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      setError("Please upload a valid CSV file (max 10MB)");
      return;
    }

    if (acceptedFiles.length > 0) {
      setError(null);
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  return (
    <Card className="border-2 border-dashed transition-colors duration-200 hover:border-primary/50">
      <div
        {...getRootProps()}
        className={cn(
          "p-12 text-center cursor-pointer transition-all duration-200",
          isDragActive && !isDragReject && "border-medical-primary bg-medical-primary/5",
          isDragReject && "border-medical-error bg-medical-error/5"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "flex items-center justify-center w-16 h-16 rounded-full transition-colors duration-200",
            isDragActive && !isDragReject ? "bg-medical-primary text-white" : 
            isDragReject ? "bg-medical-error text-white" :
            "bg-gradient-primary text-white"
          )}>
            {isDragReject ? (
              <AlertCircle className="w-8 h-8" />
            ) : isDragActive ? (
              <FileSpreadsheet className="w-8 h-8" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragActive ? "Drop your CSV file here" : "Upload your CSV file"}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your CSV file here, or click to browse
            </p>
            
            {!isDragActive && (
              <Button variant="outline" className="mx-auto">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Supported format: CSV files up to 10MB</p>
            <p>Your data is processed locally and never stored</p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-medical-error">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};