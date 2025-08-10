import { Stethoscope } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CSV Doctor</h1>
              <p className="text-xs text-muted-foreground">Data Health Diagnostics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Powered by AI</span>
            <div className="w-2 h-2 bg-medical-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};