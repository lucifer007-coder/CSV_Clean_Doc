import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  FileText,
  Zap,
  BarChart3
} from "lucide-react";
import { IssueCard } from "./IssueCard";
import { DataPreview } from "./DataPreview";

interface AnalysisReportProps {
  data: {
    headers: string[];
    rows: string[][];
    issues: Issue[];
    stats: DataStats;
  };
  onReset: () => void;
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

export const AnalysisReport = ({ data, onReset }: AnalysisReportProps) => {
  const [fixedIssues, setFixedIssues] = useState<string[]>([]);
  const [isFixing, setIsFixing] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-medical-error';
      case 'medium': return 'bg-medical-warning';
      case 'low': return 'bg-medical-success';
      default: return 'bg-muted';
    }
  };

  const getQualityScoreColor = (score: number) => {
    if (score >= 80) return 'text-medical-success';
    if (score >= 60) return 'text-medical-warning';
    return 'text-medical-error';
  };

  const handleAutoFix = async () => {
    setIsFixing(true);
    
    // Simulate fixing issues
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const autoFixableIssues = data.issues
      .filter(issue => issue.autoFixable)
      .map(issue => `${issue.column}_${issue.type}`);
    
    setFixedIssues(autoFixableIssues);
    setIsFixing(false);
  };

  const handleDownload = () => {
    // Create CSV content
    const csvContent = [
      data.headers.join(','),
      ...data.rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const unfixedIssues = data.issues.filter(
    issue => !fixedIssues.includes(`${issue.column}_${issue.type}`)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Diagnosis Complete</h2>
          <p className="text-muted-foreground">
            Analysis of {data.stats.totalRows} rows, {data.stats.totalColumns} columns
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-medical-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Rows</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {data.stats.totalRows.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-medical-primary" />
              <span className="text-sm font-medium text-muted-foreground">Columns</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {data.stats.totalColumns}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-medical-warning" />
              <span className="text-sm font-medium text-muted-foreground">Issues Found</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {unfixedIssues.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-medical-success" />
              <span className="text-sm font-medium text-muted-foreground">Quality Score</span>
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <p className={`text-2xl font-bold ${getQualityScoreColor(data.stats.dataQualityScore)}`}>
                {data.stats.dataQualityScore}%
              </p>
              <Progress value={data.stats.dataQualityScore} className="flex-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-Fix Section */}
      {unfixedIssues.some(issue => issue.autoFixable) && (
        <Card className="border-medical-primary/20 bg-medical-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-medical-primary" />
                  Auto-Fix Available
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {unfixedIssues.filter(issue => issue.autoFixable).length} issues can be automatically fixed
                </p>
              </div>
              <Button 
                onClick={handleAutoFix} 
                disabled={isFixing}
                className="bg-medical-primary hover:bg-medical-primary/90"
              >
                {isFixing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Fixing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Fix All
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="issues" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="issues">Issues ({unfixedIssues.length})</TabsTrigger>
          <TabsTrigger value="preview">Data Preview</TabsTrigger>
          <TabsTrigger value="fixed">Fixed ({fixedIssues.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          {unfixedIssues.length > 0 ? (
            <div className="grid gap-4">
              {unfixedIssues.map((issue, index) => (
                <IssueCard 
                  key={`${issue.column}_${issue.type}_${index}`} 
                  issue={issue}
                  onFix={() => {
                    setFixedIssues(prev => [...prev, `${issue.column}_${issue.type}`]);
                  }}
                />
              ))}
            </div>
          ) : (
            <Card className="border-medical-success/20 bg-medical-success/5">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-medical-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">All Issues Resolved!</h3>
                <p className="text-muted-foreground">
                  Your CSV file is now clean and ready for analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview">
          <DataPreview headers={data.headers} rows={data.rows} />
        </TabsContent>

        <TabsContent value="fixed" className="space-y-4">
          {fixedIssues.length > 0 ? (
            <div className="space-y-2">
              {data.issues
                .filter(issue => fixedIssues.includes(`${issue.column}_${issue.type}`))
                .map((issue, index) => (
                  <Card key={index} className="border-medical-success/20 bg-medical-success/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {issue.column}
                            </Badge>
                            <span className="text-sm font-medium text-foreground">
                              {issue.description}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Fixed {issue.count} occurrence(s)
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-medical-success" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No issues have been fixed yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};