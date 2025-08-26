import { Button } from "@/components/ui/button";

export default function Header({ title, ranges = [], selectedRange, onRangeChange }) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <div className="flex gap-2">
            {ranges.map((range) => (
              <Button
                key={range}
                variant={selectedRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => onRangeChange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
