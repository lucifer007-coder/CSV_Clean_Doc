import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Zap, 
  CheckCircle,
  Copy,
  Users,
  Calendar,
  Hash,
  FileText
} from "lucide-react";

interface Issue {
  column: string;
  type: 'duplicate' | 'missing' | 'format' | 'outlier' | 'encoding';
  severity: 'low' | 'medium' | 'high';
  count: number;
  description: string;
  autoFixable: boolean;
}

interface IssueCardProps {
  issue: Issue;
  onFix: () => void;
}

export const IssueCard = ({ issue, onFix }: IssueCardProps) => {
  const [isFixing, setIsFixing] = useState(false);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertCircle className="w-4 h-4" />;
      case 'low': return <Info className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-medical-error bg-medical-error/10 border-medical-error/20';
      case 'medium': return 'text-medical-warning bg-medical-warning/10 border-medical-warning/20';
      case 'low': return 'text-medical-success bg-medical-success/10 border-medical-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'duplicate': return <Copy className="w-4 h-4" />;
      case 'missing': return <AlertCircle className="w-4 h-4" />;
      case 'format': return <Calendar className="w-4 h-4" />;
      case 'outlier': return <Hash className="w-4 h-4" />;
      case 'encoding': return <FileText className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getFixSuggestion = (issue: Issue) => {
    switch (issue.type) {
      case 'duplicate': return 'Remove duplicate rows while preserving the first occurrence';
      case 'missing': return issue.column.toLowerCase().includes('age') || issue.column.toLowerCase().includes('number') 
        ? 'Fill missing values with median' 
        : 'Fill missing values with "Unknown"';
      case 'format': return 'Standardize date format to ISO-8601 (YYYY-MM-DD)';
      case 'outlier': return 'Flag outliers for manual review';
      case 'encoding': return 'Convert to UTF-8 encoding';
      default: return 'Apply recommended fix';
    }
  };

  const handleFix = async () => {
    setIsFixing(true);
    
    // Simulate fix delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onFix();
    setIsFixing(false);
  };

  return (
    <Card className={`border transition-all duration-200 hover:shadow-medium ${getSeverityColor(issue.severity)}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${getSeverityColor(issue.severity)}`}>
                {getSeverityIcon(issue.severity)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs font-medium">
                    {issue.column}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getTypeIcon(issue.type)}
                    <span className="text-xs uppercase tracking-wide font-medium">
                      {issue.type}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-foreground">
                  {issue.description}
                </h3>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {issue.count} occurrence{issue.count !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {issue.autoFixable && (
              <div className="bg-muted/30 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-medical-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Suggested Fix:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getFixSuggestion(issue)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ml-4">
            {issue.autoFixable ? (
              <Button 
                onClick={handleFix}
                disabled={isFixing}
                size="sm"
                className="bg-medical-primary hover:bg-medical-primary/90"
              >
                {isFixing ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                    Fixing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Fix
                  </>
                )}
              </Button>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Manual Review
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};