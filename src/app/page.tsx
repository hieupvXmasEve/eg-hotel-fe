import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <p className="text-red-400">Hieu pv</p>
      <Button variant="ghost" size="sm">
        Click me
      </Button>
      <Button>Click me</Button>
      <Button variant="muted" disabled>
        Click me
      </Button>
      <Button variant="muted" size="lg">
        Click me
      </Button>
    </div>
  );
}
