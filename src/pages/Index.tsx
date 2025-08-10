import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisReport } from "@/components/AnalysisReport";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Stethoscope, TrendingUp, Shield } from "lucide-react";

interface CSVData {
  headers: string[];
  rows: string[][];
  issues: Issue[];
  stats: DataStats;
}

interface Issue {
  column: string;
  type: 'duplicate' | 'missing' | 'format' | 'outlier' | 'encoding';
  severity: 'low' | 'medium' | 'high';
  count: number;
  description: string;
  autoFixable: boolean;
}

interface DataStats {
  totalRows: number;
  totalColumns: number;
  issuesFound: number;
  dataQualityScore: number;
}

const Index = () => {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results
    const mockData: CSVData = {
      headers: ['id', 'name', 'age', 'email', 'signup_date'],
      rows: [
        ['1', 'Alice Johnson', '25', 'alice@email.com', '2023-01-15'],
        ['2', 'Bob Smith', '32', 'bob@email.com', '2023-01-16'],
        ['3', 'Charlie Brown', '', 'charlie@email.com', '2023/01/17'],
        ['4', 'Alice Johnson', '25', 'alice@email.com', '2023-01-15'], // duplicate
      ],
      issues: [
        {
          column: 'age',
          type: 'missing',
          severity: 'medium',
          count: 1,
          description: 'Missing values detected in age column',
          autoFixable: true
        },
        {
          column: 'signup_date',
          type: 'format',
          severity: 'low',
          count: 1,
          description: 'Inconsistent date formats (ISO vs MM/DD/YYYY)',
          autoFixable: true
        },
        {
          column: 'entire_row',
          type: 'duplicate',
          severity: 'high',
          count: 1,
          description: 'Duplicate rows found',
          autoFixable: true
        }
      ],
      stats: {
        totalRows: 4,
        totalColumns: 5,
        issuesFound: 3,
        dataQualityScore: 75
      }
    };
    
    setCsvData(mockData);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!csvData && !isAnalyzing && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                CSV Doctor
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Diagnose and heal your CSV files automatically. Detect data quality issues, 
                apply intelligent fixes, and get your data analysis-ready in minutes.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center border-0 shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-medical-primary/10 rounded-lg mb-4">
                  <Shield className="w-6 h-6 text-medical-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically detect duplicates, missing values, format inconsistencies, and outliers
                </p>
              </Card>
              
              <Card className="p-6 text-center border-0 shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-medical-success/10 rounded-lg mb-4">
                  <TrendingUp className="w-6 h-6 text-medical-success" />
                </div>
                <h3 className="font-semibold mb-2">Auto-Fix</h3>
                <p className="text-sm text-muted-foreground">
                  Apply intelligent fixes with one click while maintaining data integrity
                </p>
              </Card>
              
              <Card className="p-6 text-center border-0 shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-medical-warning/10 rounded-lg mb-4">
                  <Stethoscope className="w-6 h-6 text-medical-warning" />
                </div>
                <h3 className="font-semibold mb-2">Health Report</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed diagnostics and before/after comparisons
                </p>
              </Card>
            </div>

            {/* Upload Section */}
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}

        {isAnalyzing && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 animate-pulse">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Analyzing Your Data</h2>
            <p className="text-muted-foreground">
              Running diagnostics and detecting data quality issues...
            </p>
          </div>
        )}

        {csvData && !isAnalyzing && (
          <AnalysisReport 
            data={csvData} 
            onReset={() => setCsvData(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Index;